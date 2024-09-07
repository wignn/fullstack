import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from 'fs-extra';
import path from 'path';


export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ status: "error", message: "Missing fields" }, { status: 400 });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ status: "error", message: "Invalid email format" }, { status: 400 });
    }
   
    // const filePath = path.join(process.cwd(), 'user_data', 'users.txt');
    // const userData = `Name:${name}, Email:${email},password:${password}\n`;
    // await fs.appendFile(filePath, userData);

    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        isOnline: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in /api/register:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { status: "error", message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { status: "error", message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
