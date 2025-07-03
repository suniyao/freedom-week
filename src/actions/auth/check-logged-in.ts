"use server";

import {getServerSession} from "next-auth";
import {prisma} from "@/actions/reusable-utils/db";
import {DatabaseUser} from "@/app/types";

export default async function CheckLoggedIn(): Promise<null | DatabaseUser> {
    const session = await getServerSession();
    if (!session) return null;
    const db_user = await prisma.user.findUnique({where: {username: session.user?.name}});
    return db_user as DatabaseUser;
}