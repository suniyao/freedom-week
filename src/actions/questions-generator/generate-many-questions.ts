"use server";

import {DifficultyRanking, Question} from "@/app/types";
import generateQuestion from "@/actions/questions-generator/generate-question";

export default async function generateManyQuestions(types: string[], difficulties: {easy: boolean, medium: boolean, hard: boolean}, amount: number): Promise<Question[]> {
    if (amount < 1) {
        throw new Error("must generate at least 1 question!")
    }
    if (!difficulties.easy && !difficulties.medium && !difficulties.hard) {
        throw new Error("At least one difficulty must be selected.");
    }

    const result: Question[] = []

    const difficulties_array = (Object.keys(difficulties) as DifficultyRanking[]).filter((key: DifficultyRanking) => difficulties[key])

    for (let i = 0; i < amount; i++) {
        const diff = difficulties_array[Math.floor(Math.random() * difficulties_array.length)];
        const type = types[Math.floor(Math.random()*types.length)];

        const question = await generateQuestion(diff, type);
        result.push(question)
    }

    return result
}