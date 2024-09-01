"use server"

import mime from 'mime-types';
import { join } from 'path';
import { stat, mkdir, writeFile } from 'fs/promises';
import { NextResponse } from "next/server";
import { z } from 'zod';
import axios from 'axios';

const BookSchema = z.object({
  title: z.string().min(6),
  author: z.string().min(3),
  coverImage: z.any().optional(),
  publishedAt: z.date().optional(),
  updatedAt: z.date().optional(),
  synopsis: z.string().optional(),
});

export const saveBook = async (prevState: any, formData: FormData) => {
  // Validate form data
  const validatedFields = BookSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return NextResponse.json({ error: validatedFields.error.flatten().fieldErrors }, { status: 400 });
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

      if (!mimeType) {
        throw new Error('Unable to determine MIME type');
      }

      const fileExtension = mimeType.split('/').pop();
      const filename = `${coverImage.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${fileExtension}`;
      await writeFile(join(uploadDir, filename), buffer);
      coverImageUrl = `${relativeUploadDir}/${filename}`;
    } catch (e) {
      console.error('Error while uploading file', e);
      return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
    }
  }

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const response = await axios.post(`${apiUrl}/books`, {
      ...validatedFields.data,
      coverImage: coverImageUrl
    });

    if (response.status === 201) {

    } else {
      return NextResponse.json({ message: 'Failed to create book' }, { status: response.status });
    }
  } catch (error) {
    console.error("Failed to create book:", error);
    return NextResponse.json({ message: 'Failed to create book' }, { status: 500 });
  }
};
