import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const users = await prisma.user.findMany({
        include: {
            stats: {
                include: {
                    sessions: {
                        include: {
                            questions: true,
                        },
                    },
                },
            },
        },
    });

    // compute total score per user
    const usersWithTotalScore = users.map((user) => {
        const sessions = user.stats?.sessions || [];
        let totalScore = 0;

        for (const session of sessions) {
            for (const question of session.questions) {
                totalScore += question.score;
            }
        }

        return {
            ...user,
            totalScore,
        };
    });

    // sort users by totalScore descending
    usersWithTotalScore.sort((a, b) => b.totalScore - a.totalScore);

    return NextResponse.json(usersWithTotalScore);
}