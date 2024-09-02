"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BookSchema = z.object({
  name: z.string().min(2),
});

export const saveGenre = async (prevState: any, formData: FormData) => {
  const validatedFields = BookSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log('sucsses')
  }

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.flatten().fieldErrors); // Debugging
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await prisma.genre.create({
      data: {
        name: validatedFields.data.name,
      },
    });
    return result
  } catch (error) {
    console.error("Failed to create book:", error);
    return { message: "Failed to create book" };
  }

  revalidatePath("/");
  redirect("/DataBook/genreCreate");
};