import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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

  const user = await prisma.user.create({
    data: {
      id: userId,
      email,
      username,
      password: hashedPassword,
      profile_picture_url: "",
      bio: "",
      userStatsUser_id: userId,
      userSettingsUser_id: userId
    }
  });

  return NextResponse.json({ id: user.id, username: user.username }, { status: 201 });
}
