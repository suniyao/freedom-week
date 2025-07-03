import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {userId, bio, email, username, profile_picture_url} = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "missing user ID" }, {status: 400});
    }

    const updateUser = await prisma.user.update({
      where: {id: userId},
      data: {
        bio, 
        email, 
        username, 
        profile_picture_url,
      },
    });

    return NextResponse.json({ message: "User updated", user: updateUser });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}