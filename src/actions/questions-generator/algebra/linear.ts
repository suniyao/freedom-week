"use server";

import {DifficultyRanking} from "@/app/types";

export default async function generateLinearQuestion(difficulty: DifficultyRanking) {
    // form of ax + b = c, solve for x
    const bleh = Math.round((Math.random() - 0.5) * 10)
    const a = bleh === 0? Math.round((Math.random()+0.1) * 10) : bleh
    const b = Math.round((Math.random() - 0.5) * 10)
    const c = Math.round((Math.random() - 0.5) * 10)

    const x = (c - b)/a;

    return {a, b, c, x}
}