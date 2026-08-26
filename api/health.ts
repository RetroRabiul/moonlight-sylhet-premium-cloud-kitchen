import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    status: 'ok',
    restaurant: 'NightFuel Sylhet',
    open: true,
    hours: '8:00 PM - 4:00 AM',
  });
}
