'use client';
import { useState } from 'react';

import 'katex/dist/katex.min.css';
import Play from '@/app/components/play/Play';
import SetUp from '@/app/components/play/SetUp';
import Review from '@/app/components/play/Review';

export default function PlayPage() {
    const [mode, setMode] = useState<'setup' | 'play' | 'review'>('setup');

    return (
        <main>
            {mode === 'setup' && <SetUp onStart={() => setMode('play')} />}
            {mode === 'play' && <Play/>}
            {mode === 'review' && <Review />}
        </main>
    )
}