"use server";

import {getServerSession} from "next-auth";
import {prisma} from "@/actions/reusable-utils/db";

export default async function CheckLoggedIn(username: string): Promise<boolean> {
    const session = await getServerSession();
    if (!session) return false;
    const db_user = await prisma.user.findUnique({where: {username}});
    return !(!db_user || db_user.username !== session.user.name);
}