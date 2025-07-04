"use client";

import 'katex/dist/katex.min.css';
import Play from '@/app/components/play/Play';
import SetUp from '@/app/components/play/SetUp';
import Review from '@/app/components/play/Review';
import LoadingStart from "@/app/components/play/LoadingStart";
import {usePlaySession} from "@/app/components/play/PlaySessionContext";

export default function PlayPageComponent() {
    const playSession = usePlaySession();

    const commencerLeJeu = () => {
        playSession.generateQuestions()
        playSession.startLoading()
    }

    return (
        <div>
            {playSession.status === 'setup' && <SetUp onStart={commencerLeJeu}/>}
            {
                playSession.status === "loadingStart" && <LoadingStart/>
            }
            {
                playSession.status === 'play' && <Play/>
            }
            {
                playSession.status === 'review' && <Review/>
            }
        </div>
    )
}