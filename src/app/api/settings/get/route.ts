import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import CheckLoggedIn from "@/actions/auth/check-logged-in";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({error: "Missing userId"}, {status: 400});
    }

    const user = await CheckLoggedIn()
    if (!user || user.id !== userId) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try {
        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {bio: true, email: true, username: true, profile_picture_url: true},
        });

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        return NextResponse.json(user);
    } catch (err) {
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}