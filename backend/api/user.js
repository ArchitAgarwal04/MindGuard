import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import authMiddleware from '../middleware/auth.js';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  await authMiddleware(req, res, async () => {
    if (req.method === 'POST') {
      const { email, name, role } = req.body;
      const user = await prisma.user.create({
        data: { email, name, role: role || 'PATIENT' },
      });
      res.status(201).json(user);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
} 