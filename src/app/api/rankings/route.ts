// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function GET() {
//   const users = await prisma.user.findMany({
//     include: { stats: true },
//     orderBy: { stats: { score: 'desc' } },
//     take: 100,
//   });

//   return NextResponse.json(users);
// }
