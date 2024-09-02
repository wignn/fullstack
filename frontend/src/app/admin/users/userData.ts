import { prisma } from "@/lib/prisma";
import e from "express";

export const dataUser = async () => {
  try {
    const result = await prisma.user.findMany();
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const SetatusUser = async (email) => {
  console.log("Updating status for email:", email);
  try {
    const hasil = await prisma.user.update({
      where: { email: email },
      data: {
        isOnline: {
          set: false,
        },
      },
    });
    console.log("Update result:", hasil);
    return hasil;
  } catch (err) {
    console.error("Error updating user status:", err);
  }
};
