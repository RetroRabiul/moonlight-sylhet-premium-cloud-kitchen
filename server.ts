import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory runtime data cache
let activeOrders: any[] = [];
let inventoryItems: any[] = [];
let customerReviews: any[] = [];

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', restaurant: 'NightFuel Sylhet', open: true, hours: '8:00 PM - 4:00 AM' });
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
