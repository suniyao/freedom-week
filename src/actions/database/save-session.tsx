"use server";

import {QuestionAttemptData} from "@/app/types";
import {prisma} from "@/actions/reusable-utils/db";

type SaveSessionParams = {
    questions: QuestionAttemptData[],
    total_milliseconds_spent: number,
    user_id: string
    ranked: boolean
}

export default async function SaveSession(params: SaveSessionParams) {
    const {questions, total_milliseconds_spent, user_id, ranked} = params;

    //TODO: confirm user login here

    const session = await prisma.session.create({
        data: {
            owner_id: user_id,
            total_milliseconds_spent,
            ranked
        }
    })

    const formatted_questions = questions.map((q) => ({
        type: q.type,
        milliseconds_spent: q.milliseconds_spent,
        correct: q.correct,
        session_id: session.id
    }))

    await prisma.questionData.createMany({
        data: formatted_questions
    })
}