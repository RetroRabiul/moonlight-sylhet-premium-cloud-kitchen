import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI client if key exists
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// System instruction for NightFuel Sylhet AI Assistant
const SYSTEM_PROMPT = `You are "FuelBot", the smart and friendly late-night AI Food Concierge & Support Assistant for "NightFuel Sylhet - Premium Cloud Kitchen".
Key Restaurant Information:
- Brand: NightFuel (Premium Cloud Kitchen in Sylhet, Bangladesh)
- Facebook: https://www.facebook.com/Nightfuel.sylhet/
- Hotline & WhatsApp: +880 1324993344
- Operating Hours: Open Daily 8:00 PM - 4:00 AM (Specializing in late-night hot food delivery).
- Delivery Areas in Sylhet: Zindabazar, Amberkhana, Shibgonj, Shahjalal Uposhohor, Tilagarh, Kumarpara, Lamabazar, Chowhatta, Akhalia (SUST Gate), Subidbazar, Pathantula, Mirabazar, Baghbari.
- Payment Methods: bKash, Nagad, Rocket, Credit/Debit Cards, Cash on Delivery.
- Menu Highlights:
  * Rice Bowls: Midnight Crispy Bowl (220 TK), Naga Fire Bowl (210 TK 🔥🔥🔥), Mexican Flame Bowl (230 TK), Smoky BBQ Bowl (200 TK).
  * Burgers: Naga Blast Burger (200 TK 🔥🔥🔥), Smoky Beef Burger (270 TK), Flame Grilled Burger (210 TK), Crispy Night Burger (190 TK), Double Fuel Burger (280 TK), Classic Fuel Burger (170 TK).
  * Pizzas (8", 10", 12"): Golden Margherita (280/400/520 TK), Smoky BBQ Chicken Pizza (380/520/650 TK), Supreme Night Pizza (390/530/660 TK), Mexican Fire Pizza (390/540/670 TK), Imperial Beef Feast (450/590/750 TK).
  * Wings & Fried Chicken: Fire Wings 6pcs (260 TK 🔥🔥🔥), Smoky BBQ Wings 6pcs (250 TK), Golden Drumsticks 2pcs (280 TK), Crispy Night Wings 2pcs (220 TK).
  * Pasta: Creamy Oven Baked Pasta (240 TK), Smoky BBQ Baked Pasta (260 TK), Naga Blaze Pasta (260 TK 🔥🔥🔥).
  * Fries, Chow Mein & Shawarma: Golden Fries (140 TK), Spicy Night Fries (160 TK), NightFuel Chow Mein (200 TK), Loaded Chicken Shawarma (180 TK).
- Loyalty Program: Fuel Rewards earning points per 100 TK spent, redeemable for free wings, fries & discounts.
- Active Promo Code: MIDNIGHT20 (20% off above 500 TK), NAGABLAST (50 TK off on Naga items).

Tone: Friendly, appetizing, responsive, helpful in both English and Bengali (Sylheti friendly greetings). Provide quick dish suggestions, spice ratings, customization ideas, delivery ETA estimates, or explain how to order through the app. Keep responses concise and formatted with nice bullet points.`;

// In-memory runtime data cache
let activeOrders: any[] = [];
let inventoryItems: any[] = [];
let customerReviews: any[] = [];

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', restaurant: 'NightFuel Sylhet', open: true, hours: '8:00 PM - 4:00 AM' });
});

// API: Chat with Gemini AI / Fallback Food Concierge
app.post('/api/chat', async (req, res) => {
  try {
    const { message, chatHistory = [], language = 'en' } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (aiClient) {
      try {
        const fullPrompt = `${SYSTEM_PROMPT}\nUser preferred language: ${language === 'bn' ? 'Bengali' : 'English'}\n\nUser Query: ${message}`;
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: fullPrompt,
        });

        const replyText = response.text || "I'm here to help you choose the best midnight meal from NightFuel!";
        res.json({ reply: replyText });
        return;
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to smart local response:', geminiError);
      }
    }

    // Smart Local Fallback Response Engine
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('naga') || lower.includes('spicy') || lower.includes('ঝাল')) {
      reply = language === 'bn' 
        ? "🔥 আমাদের সবচেয়ে জনপ্রিয় ঝাল আইটেমগুলো হলো:\n• নাগা ব্লাস্ট বার্গার (২০০ টাকা)\n• নাগা ফায়ার বাউল (২১০ টাকা)\n• ফায়ার উইংস ৬ পিস (২৬০ টাকা)\n• নাগা ব্লেজ পাস্তা (২৬০ টাকা)\nসিলেটের খাঁটি নাগা মরিচ দিয়ে তৈরি! ঝাল কমাতে সাথে কোল্ড ড্রিঙ্কস বা এক্সট্রা চিজ নিতে পারেন।"
        : "🔥 Our top spicy recommendations with authentic Sylheti Naga morich:\n• **Naga Blast Burger** (200 TK) - Signature bestseller!\n• **Fire Wings (6 pcs)** (260 TK) - Lethal Naga glaze\n• **Naga Fire Bowl** (210 TK) - Spicy rice & chicken\n• **Naga Blaze Pasta** (260 TK) - Fiery oven baked goodness!";
    } else if (lower.includes('delivery') || lower.includes('area') || lower.includes('ডেলিভারি') || lower.includes('সাস্ট') || lower.includes('sust')) {
      reply = language === 'bn'
        ? "🛵 আমরা প্রতিদিন রাত ৮:০০ টা থেকে ভোর ৪:০০ টা পর্যন্ত পুরো সিলেট শহরে দ্রুততম ডেলিভারি দিয়ে থাকি (জিন্দাবাজার, আম্বরখানা, শিবগঞ্জ, উপশহর, টিলাগড়, সাস্ট গেট/আখালিয়া, কুমারপাড়া ইত্যাদি)। হটলাইন: +880 1324993344"
        : "🛵 NightFuel delivers across all Sylhet areas (Zindabazar, Amberkhana, Shibgonj, Uposhohor, Tilagarh, SUST Gate/Akhalia, Kumarpara, etc.) daily from **8:00 PM to 4:00 AM**! Average delivery time is 20-30 minutes.";
    } else if (lower.includes('burger') || lower.includes('বার্গার')) {
      reply = language === 'bn'
        ? "🍔 আমাদের বার্গার মেনু:\n• নাগা ব্লাস্ট বার্গার - ২০০ টাকা\n• স্মোকি বিফ বার্গার - ২৭০ টাকা\n• ডাবল ফুয়েল বার্গার - ২৮০ টাকা\n• ক্রিস্পি নাইট বার্গার - ১৯০ টাকা\n• ক্লাসিক ফুয়েল বার্গার - ১৭০ টাকা\nসরাসরি মেনু ট্যাব থেকে কার্টে অ্যাড করতে পারেন!"
        : "🍔 NightFuel Burger Lineup:\n• **Naga Blast Burger** (200 TK) - Super spicy bestseller!\n• **Smoky Beef Burger** (270 TK) - 100% juicy beef patty\n• **Double Fuel Burger** (280 TK) - Double patty monster\n• **Crispy Night Burger** (190 TK) - Ultra crunchy fillet";
    } else if (lower.includes('pizza') || lower.includes('পিৎজা')) {
      reply = language === 'bn'
        ? "🍕 আমাদের ৮\", ১০\" ও ১২\" সাইজের পিৎজা রয়েছে:\n• গোল্ডেন মার্গারিটা (২৮০ / ৪০০ / ৫২০ টাকা)\n• স্মোকি BBQ চিকেন পিৎজা (৩৮০ / ৫২০ / ৬৫০ টাকা)\n• সুপ্রিম নাইট পিৎজা (৩৯০ / ৫৩০ / ৬৬০ টাকা)\n• ইম্পেরিয়াল বিফ ফিস্ট (৪৫০ / ৫৯০ / ৭৫০ টাকা)"
        : "🍕 Hand-tossed artisan pizzas available in 8\", 10\", and 12\":\n• **Smoky BBQ Chicken Pizza** (380 / 520 / 650 TK)\n• **Supreme Night Pizza** (390 / 530 / 660 TK)\n• **Golden Margherita** (280 / 400 / 520 TK)\n• **Imperial Beef Feast** (450 / 590 / 750 TK)";
    } else if (lower.includes('offer') || lower.includes('promo') || lower.includes('discount') || lower.includes('কুপন') || lower.includes('অফার')) {
      reply = language === 'bn'
        ? "🎉 বর্তমান অফার কোড:\n• **MIDNIGHT20** - ৫০০ টাকার অর্ডারে ২০% ছাড় (রাত ১১টা-৩টা)\n• **NAGABLAST** - নাগা আইটেমে ৫০ টাকা ফ্ল্যাট ছাড়\n• **SYLHETFREE** - ৭০০ টাকার উপরে ফ্রি ডেলিভারি"
        : "🎉 Active Promo Codes:\n• **MIDNIGHT20**: 20% OFF on orders over 500 TK (11 PM - 3:30 AM)\n• **NAGABLAST**: Flat 50 TK OFF on Naga orders over 350 TK\n• **SYLHETFREE**: Free Delivery across Sylhet on orders over 700 TK";
    } else if (lower.includes('bkash') || lower.includes('nagad') || lower.includes('payment') || lower.includes('পেমেন্ট')) {
      reply = language === 'bn'
        ? "💳 আপনি bKash, Nagad, Rocket, ভিসা/মাস্টারকার্ড অথবা ক্যাশ অন ডেলিভারি (COD) এর মাধ্যমে নিরাপদে পেমেন্ট করতে পারবেন।"
        : "💳 We accept bKash, Nagad, Rocket, Credit/Debit Cards, and Cash on Delivery (COD). Instant digital wallet verification is supported in the checkout modal!";
    } else {
      reply = language === 'bn'
        ? "স্বাগতম নাইটফুয়েল সিলেটে! 🌙 আমরা রাত ৮টা থেকে ভোর ৪টা পর্যন্ত গরম ও সুস্বাদু খাবার ডেলিভারি করি। যেকোনো বার্গার, পিৎজা, রাইস বাউল বা উইংস পছন্দ করুন এবং সরাসরি অর্ডার প্লেস করুন!"
        : "Welcome to NightFuel Sylhet! 🌙 We fuel your late-night hunger from 8:00 PM to 4:00 AM daily with piping hot Rice Bowls, Burgers, Pizzas, Wings, and Pasta. How can I assist your order tonight?";
    }

    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// API: Send simulated SMS / WhatsApp Order Notification
app.post('/api/notify-order', (req, res) => {
  const { orderNumber, phone, status } = req.body;
  res.json({
    success: true,
    message: `Push notification & SMS dispatched for Order ${orderNumber} to ${phone} (Status: ${status})`
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NightFuel Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
