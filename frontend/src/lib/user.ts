import { PrismaClient } from '@prisma/client';
import { string } from 'zod';

const prisma = new PrismaClient();

async function createUser({name, password, email, verifyToken}:any) {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        password: password,
        email: email,
        verifyToken: {
          type:string,
          require: false
        },
      },
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

