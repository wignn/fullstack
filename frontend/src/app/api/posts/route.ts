import { PrismaClient } from "@prisma/client";
import mime from "mime-types";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = (formData.get("title") as string) || null;
    const content = (formData.get("content") as string) || null;
    const authorId = (formData.get("author") as string) || null;
    const image = (formData.get("image") as File) || null;
    const have = (formData.get("have") as string|| null)
   

    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Image:", image);
    console.log("Author ID:", authorId);
    console.log(`have is ${have}`)

    if (!title || !image || !authorId || !content) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date()
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error("Error creating directory for upload", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const mimeType = mime.lookup(image.name);
      if (!mimeType) {
        throw new Error("Unable to determine MIME type");
      }

      const fileExtension = mimeType.split("/").pop();
      const filename = `${image.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${fileExtension}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;

      const result = await prisma.article.create({
        data: {
          title,
          content,
          image: fileUrl,
          authorId: parseInt(authorId),
          have: have
        },
      });

      revalidatePath("/DataBook");
      return NextResponse.json({ post: result });
    } catch (e) {
      console.error("Error while uploading file", e);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  } catch (e) {
    console.error("Error handling POST request", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
