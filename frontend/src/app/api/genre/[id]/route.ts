// /api/genres.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const genres = await prisma.genre.findMany({
        include: { books: true }, // Include books if needed
      });
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch genres' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
