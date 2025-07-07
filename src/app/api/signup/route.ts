import {NextResponse} from "next/server";
import {Prisma, PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import {parseCreateUserData} from "@/actions/validation/create-user-validation";
import {ZodError} from "zod";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const request_json = await req.json();
    //ts is now parsed and validated
    const {email, username, password} = await parseCreateUserData(request_json);

    if (!email || !username || !password) {
        return NextResponse.json({error: "Missing fields"}, {status: 400});
    }

    const existing = await prisma.user.findFirst({
        where: {
            OR: [
                {email: {equals: email}},
                {username: {equals: username}}
            ]
        }
    });
    if (existing && existing.email === email) {
        return NextResponse.json({error: "Email in use"}, {status: 400});
    } else if (existing && existing.username === username) {
        return NextResponse.json({error: "Username in use"}, {status: 400});
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    // Create stats/settings first
    // await prisma.userStats.create({ data: { user_id: userId } });
    // await prisma.userSettings.create({ data: { user_id: userId } });
    try {
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                profile_picture_url: "",
                bio: "",
            }
        });

        return NextResponse.json({id: user.id, username: user.username}, {status: 201});
    } catch (err) {
        if (err instanceof ZodError) {
            return NextResponse.json({error: err}, {status: 400});
        }

        //lowkey not too sure what this legacy code does :pf:
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            const target = (err.meta?.target as string[]) || [];
            if (target.includes("username")) {
                return NextResponse.json({error: "Username already taken. Please choose another."}, {status: 400});
            } else if (target.includes("email")) {
                return NextResponse.json({error: "Email already registered."}, {status: 400});
            } else {
                return NextResponse.json({error: "A unique field already exists."}, {status: 400});
            }
        }

        console.error("Signup error", err);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
