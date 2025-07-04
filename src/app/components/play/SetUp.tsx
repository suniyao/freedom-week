'use client';

import ProblemTypeMenu from "./ProblemTypeMenu";
import {useState} from "react";
import {usePlaySession} from "@/app/components/play/PlaySessionContext";

export default function SetUp(props: {onStart: VoidFunction}) {
    //const [infinityMode, setInfinityMode] = useState(false);
    const playSession = usePlaySession();
    return (
        <div className="w-full min-h-screen flex flex-col bg-amber-100 text-stone-900 p-6 gap-8">
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
                        <h2 className="text-2xl font-semibold">How many questions?</h2>
                        <input
                            type="number"
                            placeholder="# of questions"
                            disabled={playSession.playMode === "infinity"}
                            className={`p-3 rounded-md border border-stone-400 focus:outline-none focus:ring-2 focus:ring-black w-full text-lg ${
                                playSession.playMode === "infinity" ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''
                            }`}
                        />
                        <div className="flex items-center gap-3 mt-2">
                            <input
                                type="checkbox"
                                id="infinityMode"
                                onChange={(e) => {e.target.checked ? playSession.setPlayMode("infinity") : playSession.setPlayMode("standard")}}
                                className="w-5 h-5"
                            />
                            <label htmlFor="infinityMode" className="text-lg">
                                Infinity Mode
                            </label>
                        </div>
                    </div>

                    <div className="mt-2 flex justify-center">
                        <button
                            onClick={props.onStart}
                            className="px-6 py-3 text-lg font-medium bg-black text-amber-100 rounded-lg hover:bg-amber-300 hover:text-black transition-all duration-200"
                        >
                            ▶️ Start Playing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}