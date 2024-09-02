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
    const bio = (formData.get("bio") as string) || null;
    const userId = (formData.get("userId") as string) || null;
    const image = (formData.get("image") as File) || null;

    console.log("Bio:", bio);
    console.log("User ID:", userId);
    console.log("Image:", image);

    if (!bio || !userId) {
      return NextResponse.json(
        { error: "Bio and user ID are required." },
        { status: 400 }
      );
    }
    const existingProfile = await prisma.profile.findUnique({
      where: { userId:parseInt(userId) },
    });

    if (existingProfile) {
      await prisma.profile.delete({
        where: { userId:parseInt(userId) },
      });
    }
    let fileUrl = null;

    if (image) {
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
        const filename = `${image.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${fileExtension}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        fileUrl = `${relativeUploadDir}/${filename}`;
      } catch (e) {
        console.error("Error while uploading file", e);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
    }

    try {
      const result = await prisma.profile.create({
        data: {
        userId: parseInt(userId) ,
          bio,
          image: fileUrl,
        },
      });

      revalidatePath("/profile");
      return NextResponse.json({ user: result });
    } catch (e) {
      console.error("Error updating user profile", e);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  } catch (e) {
    console.error("Error handling POST request", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
