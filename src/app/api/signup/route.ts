import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = crypto.randomUUID();

  // Create stats/settings first
  // await prisma.userStats.create({ data: { user_id: userId } });
  // await prisma.userSettings.create({ data: { user_id: userId } });
  try {
    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        username,
        password: hashedPassword,
        profile_picture_url: "",
        bio: "",
      }
    });

  return NextResponse.json({ id: user.id, username: user.username }, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const target = (err.meta?.target as string[]) || [];
      if (target.includes("username")) {
        return NextResponse.json({ error: "Username already taken. Please choose another." }, { status: 400 });
      } else if (target.includes("email")) {
        return NextResponse.json({ error: "Email already registered." }, { status: 400 });
      } else {
        return NextResponse.json({ error: "A unique field already exists." }, { status: 400 });
      }
    }

    console.error("Signup error", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
