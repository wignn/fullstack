
"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { unlink } from 'fs/promises';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import mime from 'mime-types';
import { join } from 'path';
import { stat, mkdir, writeFile } from 'fs/promises';
import { NextResponse } from "next/server";


const BookSchema = z.object({
  title: z.string().min(6),
  // genre: z.string().min(3),
  author: z.string().min(3),
  coverImage: z.any().optional(),
  publishedAt: z.date().optional(),
  updatedAt: z.date().optional(),
  synopsis: z.string().optional(),
});

// export const saveBook = async (prevState: any, formData: FormData) => {
//   const validatedFields = BookSchema.safeParse(
//     Object.fromEntries(formData.entries())
//   );

//   if (!validatedFields.success) {
//     // console.log("Validation failed:", validatedFields.error.flatten().fieldErrors); // Debugging
//     return {
//       Error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const coverImage = formData.get('coverImage') as File | null;
//   let coverImageUrl: string | null = null;

//   if (coverImage) {
//     const buffer = Buffer.from(await coverImage.arrayBuffer());
//     const relativeUploadDir = `/uploads/${new Date().toLocaleDateString('id-ID', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     }).replace(/\//g, '-')}`;
//     const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

//     try {
//       await stat(uploadDir);
//     } catch (e: any) {
//       if (e.code === 'ENOENT') {
//         await mkdir(uploadDir, { recursive: true });
//       } else {
//         console.error('Error creating directory for upload', e);
//         return NextResponse.json({ error: 'Server error' }, { status: 500 });
//       }
//     }

//     try {
//       const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//       const mimeType = mime.lookup(coverImage.name);
//       // console.log(`MIME Type: ${mimeType}`); // Log the MIME type

//       if (!mimeType) {
//         throw new Error('Unable to determine MIME type');
//       }

//       const fileExtension = mimeType.split('/').pop();
//       const filename = `${coverImage.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${fileExtension}`;
//       await writeFile(`${uploadDir}/${filename}`, buffer);
//       coverImageUrl = `${relativeUploadDir}/${filename}`;
//     } catch (e) {
//       console.error('Error while uploading file', e);
//       return { message: "Failed to upload image" };
//     }
//   }

//   try {
//     await prisma.book.create({
//       data: {
//         title: validatedFields.data.title,
//         author: validatedFields.data.author,
//         synopsis: validatedFields.data.synopsis,
//         coverImage: coverImageUrl || validatedFields.data.coverImage,
//         publishedAt: validatedFields.data.publishedAt || new Date(),
//       },
//     });
//   } catch (error) {
//     console.error("Failed to create book:", error);
//     return { message: "Failed to create book" };
//   }

//   revalidatePath("/DataBook");
//   redirect("/DataBook");
// };

export const updateBook = async (id: string, prevState: any, formData: FormData) => {
  const validatedFields = BookSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    // console.log("Validation failed:", validatedFields.error.flatten().fieldErrors); // Debugging
    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const coverImage = formData.get('coverImage') as File | null;
  let coverImageUrl: string | null = null;

  if (coverImage) {
    const buffer = Buffer.from(await coverImage.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-')}`;
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error('Error creating directory for upload', e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const mimeType = mime.lookup(coverImage.name);
      console.log(`MIME Type: ${mimeType}`); 

      if (!mimeType) {
        throw new Error('Unable to determine MIME type');
      }

      const fileExtension = mimeType.split('/').pop();
      const filename = `${coverImage.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${fileExtension}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      coverImageUrl = `${relativeUploadDir}/${filename}`;
    } catch (e) {
      console.error('Error while uploading file', e);
      return { message: "Failed to upload image" };
    }
  }

  try {
    await prisma.book.update({
      data: {
        title: validatedFields.data.title,
        synopsis: validatedFields.data.synopsis,
        author: validatedFields.data.author,
        coverImage: coverImageUrl || validatedFields.data.coverImage,
        updatedAt: validatedFields.data.updatedAt || new Date(),
      },
      where: { id },
    });
    console.log('Book updated successfully');
  } catch (error) {
    console.error("Failed to update book:", error);
    return { message: "Failed to update book" };
  }

  revalidatePath("/DataBook");
  redirect("/DataBook");
};

export const deleteBook = async (id: string) => {
  try {
    console.log('Deleting book with ID:', id);


    await prisma.chapter.deleteMany({
      where: { bookId: id },
    });
    
    await prisma.bookMark.deleteMany({
      where: { bookId: id },
    });

    await prisma.book.update({
      where: { id },
      data: {
        genre: {
          disconnect: [],  
        },
      },
    });

 
    await prisma.book.delete({
      where: { id },
    });

    console.log('Book and related records deleted successfully');
    
  } catch (error: any) {
    console.error(`Failed to delete book: ${error.code} - ${error.message}`);
    return { message: "Failed to delete book" };
  }
};


export const deletePost = async (id: string) => {
  try {
    const post = await prisma.article.findUnique({
      where: { id },
    }); 


    if (post && post.image) {
      const filePath = join(process.cwd(), 'public', post.image);
      await unlink(filePath);
    }
    await prisma.article.delete({
      where: { id },
    });

    console.log('Deleted successfully');
  } catch (error) {
    console.error("Failed to delete:", error);
    throw new Error("Failed to delete");
  }

  revalidatePath("/DataBook");
};

const UserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  profilePicture: z.instanceof(File).optional(),
});

export const updateUser = async (id: string, formData: FormData) => {
  const validatedFields = UserSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.flatten().fieldErrors);
    return NextResponse.json({ error: "Validation failed", details: validatedFields.error.flatten().fieldErrors }, { status: 400 });
  }

  const profilePicture = formData.get('profilePicture') as File | null;
  let profilePictureUrl: string | null = null;

  if (profilePicture) {
    const buffer = Buffer.from(await profilePicture.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date().toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-')}`;
    const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error('Error creating directory for upload', e);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const mimeType = mime.lookup(profilePicture.name);
      console.log(`MIME Type: ${mimeType}`);

      if (!mimeType) {
        throw new Error('Unable to determine MIME type');
      }

      const fileExtension = mimeType.split('/').pop();
      const filename = `${profilePicture.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${fileExtension}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      profilePictureUrl = `${relativeUploadDir}/${filename}`;
    } catch (e) {
      console.error('Error while uploading file', e);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      data: {
        name: validatedFields.data.name,
        profilePicture: profilePictureUrl || undefined,
      },
      where: { id: parseInt(id, 10) },
    });
    console.log('User updated successfully');
    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
};