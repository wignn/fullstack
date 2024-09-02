import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        console.log(email)
        try {
            const result = await prisma.user.update({
                where: { email: email },
                data: { isOnline:{ set: false} },
            });

            res.status(200).json(result);
        } catch (error) {
            console.error('Error updating user status:', error);
            res.status(500).json({ error: 'Error updating user status' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
