"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function updatePassword({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}) {
  try {
    await prisma.$connect();

    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
      },
    });

    if (!user) {
      throw new Error("Invalid token");
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHashed = await bcrypt.hash(newPassword, salt);
    const now = new Date();
    
    if (user.tokenCreatedAt === now) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          tokenCreatedAt: null,
          verifyToken: null,
        },
      });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordHashed,
        verifyToken: null, 
        tokenCreatedAt:null,
      },
    });

  
    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: "Failed to update password" };
  } finally {
    await prisma.$disconnect();
  }
}
