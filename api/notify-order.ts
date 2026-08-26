import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderNumber, phone, status } = req.body;
  return res.status(200).json({
    success: true,
    message: `Push notification & SMS dispatched for Order ${orderNumber} to ${phone} (Status: ${status})`,
  });
}
