'use client';

import ProblemTypeMenu from "./ProblemTypeMenu";
import {useState} from "react";
import {usePlaySession} from "@/app/components/play/PlaySessionContext";
import Image from "next/image";

export default function SetUp(props: {onStart: VoidFunction}) {
    //const [infinityMode, setInfinityMode] = useState(false);
    const playSession = usePlaySession();
    //const [questionCount, setQuestionCount] = useState<number>(10);
    const [error, setError] = useState<string>("");

    const handleStart = () => {
      setError("");

      const selectedTypes = playSession.questionTypes;
      const selectedDiffs = playSession.difficulties;

      const atLeastOneType = selectedTypes && Object.values(selectedTypes).some((v) => v);
      const atLeastOneDiff = Object.values(selectedDiffs).some((v) => v);
      const validQuestionCount = playSession.playMode === "infinity" || playSession.numberOfQuestions >= 1;

      if (!atLeastOneDiff) {
        setError("Please select at least one difficulty level.");
        return;
      }
      if (!atLeastOneType) {
        setError("Please select at least one problem type.");
        return;
      }
      if (!validQuestionCount) {
        setError("Please enter a valid number of questions (1 or more).");
        return;
      }

      //if (validQuestionCount) {
      //  playSession.setNumberOfQuestions(questionCount);
      //}
      props.onStart();
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-amber-100 text-stone-900 p-6 gap-8 justify-center">
            <h1 className="text-4xl font-bold text-center">Set Up Your Game</h1>
            <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full">
                {/* Left Panel - Problem Types */}
                <div className="bg-amber-200 p-6 rounded-2xl shadow-lg flex-1 flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold">Choose Problem Types</h2>
                    <ProblemTypeMenu/>
                </div>

                {/* Right Panel - Settings */}
                <div className="flex flex-col justify-between flex-1 gap-6">
                    <div className="bg-amber-200 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
                      <h2 className="text-2xl font-semibold">Select Difficulty Levels</h2>
                        <div className="flex flex-col gap-4 mt-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={playSession.difficulties.easy}
                                    onChange={(e) => playSession.setDifficulties({...playSession.difficulties, easy: e.target.checked})}
                                    className="w-5 h-5 text-lg"
                                />
                                Easy
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={playSession.difficulties.medium}
                                    onChange={(e) => playSession.setDifficulties({...playSession.difficulties, medium: e.target.checked})}
                                    className="w-5 h-5 text-lg"
                                />
                                Medium
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={playSession.difficulties.hard}
                                    onChange={(e) => playSession.setDifficulties({...playSession.difficulties, hard: e.target.checked})}
                                    className="w-5 h-5 text-lg"
                                />
                                Hard
                            </label>
                        </div>
                    </div>
                    <div className="bg-amber-200 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold">How many questions?</h2>
                        <input
                          type="number"
                          value={playSession.numberOfQuestions}
                          placeholder="# of questions"
                          disabled={playSession.playMode === "infinity"}
                          min="1"
                          className={`
                            w-full px-4 py-3
                            rounded-xl
                            text-lg
                            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500
                            placeholder:text-stone-400
                            bg-amber-100 text-stone-900
                            disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed
                            border-stone-300
                          `}
                          onChange={(e) => {
                            const val = Math.max(1, Math.floor(Number(e.target.value)));
                            playSession.setNumberOfQuestions(isNaN(val) ? 1 : val);
                          }}
                        />
                        {/*<div className="flex items-center gap-3 mt-2">
                            <input
                                type="checkbox"
                                id="infinityMode"
                                onChange={(e) => {e.target.checked ? playSession.setPlayMode("infinity") : playSession.setPlayMode("standard")}}
                                className="w-5 h-5"
                            />
                            <label htmlFor="infinityMode" className="text-lg">
                                Infinity Mode
                            </label>
                        </div>*/}
                    </div>
                    
                    {error && (
                        <div className="text-red-600 text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div className="mt-2 flex justify-center">
                      <Image src={"/assets/cat_pointing_right.gif"}
                        width={40}
                        height={32}
                        alt="cat pointing right"/>
                        <button
                            onClick={handleStart}
                            className="px-6 py-3 ml-3 text-lg font-medium bg-black text-amber-100 rounded-lg hover:bg-amber-300 hover:text-black transition-all duration-200"
                        >
                            ▶️ Start Playing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}