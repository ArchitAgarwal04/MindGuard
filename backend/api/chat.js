import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import authMiddleware from '../middleware/auth.js';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await authMiddleware(req, res, async () => {
    if (req.method === 'POST') {
      const { userId, message } = req.body;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.role !== 'PATIENT') {
        return res.status(403).json({ message: 'Access denied: Only patients can access this chat.' });
      }

      res.status(200).json({ response: 'Response from the chat API' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
} 