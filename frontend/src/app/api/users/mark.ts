'use server'
import { prisma } from "@/lib/prisma";

export const data = async (userId: any) => {
  console.log(`Received userId: ${userId}`);
  try {
    const dataUser = await prisma.book.findUnique({
      where: { id: userId },
    });

    return dataUser;
  } catch (err) {
    console.error("Error fetching user data:", err);
    return null;
  }
};

export const profileUser = async (userId: any) => {
  console.log(`Received userId:aaaa ${userId}`);
  try {
    const dataProfile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    return dataProfile;
  } catch (err) {
    console.error("Error fetching profile data:", err);
    return null;
  }
};
