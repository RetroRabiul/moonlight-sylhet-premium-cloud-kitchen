import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const ChatAssistant: React.FC = () => {
  const { language, setIsCartOpen, applyPromo } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text:
        language === 'bn'
          ? 'হ্যালো! আমি নাইটফুয়েল এআই অ্যাসিস্ট্যান্ট। সিলেটে রাতের সেরা খাবার নির্বাচন বা অর্ডার সম্পর্কিত যেকোনো প্রশ্ন আমাকে করতে পারেন।'
          : "Hello! I'm FuelBot, your MoonLight Sylhet AI Concierge. Ask me for food recommendations, spice advice, or midnight delivery info!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '🔥 Naga Spice Level', bengaliLabel: '🔥 নাগা উইংস কেমন ঝাল?' },
    { label: '⭐ Bestseller Dishes', bengaliLabel: '⭐ জনপ্রিয় খাবারগুলো কি?' },
    { label: '🛵 Delivery Hours & Areas', bengaliLabel: '🛵 ডেলিভারি এরিয়া ও সময়' },
    { label: '💳 bKash Payment', bengaliLabel: '💳 বিকাশ পেমেন্ট পদ্ধতি' },
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      const botReply = data.reply || (language === 'bn' ? 'নাইটফুয়েল হটলাইনে কল করুন: +880 1324993344' : 'Please call our hotline: +880 1324993344');

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text:
            language === 'bn'
              ? 'আমরা রাত ৮টা থেকে ভোর ৪টা পর্যন্ত পুরো সিলেটে হট ডেলিভারি দিচ্ছি। আমাদের হটলাইন: +880 1324993344।'
              : 'MoonLight delivers piping hot meals across Sylhet from 8:00 PM to 4:00 AM! Contact us anytime at +880 1324993344.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="open-chat-concierge-btn"
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-white text-black shadow-2xl flex items-center gap-2 font-bold text-xs transition-transform active:scale-95 group border border-neutral-300"
        >
          <Bot className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">
            {language === 'bn' ? 'ফুয়েলবট এআই' : 'Chat with FuelBot'}
          </span>
          <span className="w-2 h-2 rounded-full bg-black animate-ping" />
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-black border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px] max-h-[85vh] animate-in slide-in-from-bottom-5 duration-200"
          id="chat-concierge-window"
        >
          {/* Top Bar */}
          <div className="p-4 bg-black border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>FuelBot</span>
                  <span className="px-1.5 py-0.2 rounded bg-white text-black text-[9px] font-bold uppercase">
                    AI
                  </span>
                </h4>
                <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sylhet Night Concierge</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              id="close-chat-btn"
              className="p-1.5 rounded-lg bg-black text-neutral-400 hover:text-white border border-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-neutral-900 text-neutral-300 flex items-center justify-center shrink-0 mt-1 border border-neutral-800">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-white text-black font-semibold rounded-tr-none'
                      : 'bg-black border border-neutral-800 text-neutral-200 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] block mt-1 ${
                      msg.sender === 'user' ? 'text-black/70' : 'text-neutral-500'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-neutral-400 text-xs">
                <Bot className="w-4 h-4 text-white animate-bounce" />
                <span className="italic text-neutral-400">FuelBot is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-black border-t border-neutral-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(language === 'bn' ? qp.bengaliLabel : qp.label)}
                className="px-2.5 py-1 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white text-[10px] font-medium whitespace-nowrap border border-neutral-800 transition-colors"
              >
                {language === 'bn' ? qp.bengaliLabel : qp.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputMessage);
            }}
            className="p-3 bg-black border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                language === 'bn' ? 'যেকোনো খাবার বা অফার সম্পর্কে জানতে লিখুন...' : 'Ask about dishes, spicy wings, delivery...'
              }
              id="chat-user-input"
              className="flex-1 px-3 py-2 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-neutral-600"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              id="chat-send-btn"
              className="p-2 rounded-xl bg-white hover:bg-neutral-200 text-black disabled:opacity-40 transition-transform active:scale-95"
            >
              <Send className="w-4 h-4 text-black" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
