'use client';
import { useState } from 'react';

import 'katex/dist/katex.min.css';
import Play from '@/app/components/play/Play';
import SetUp from '@/app/components/play/SetUp';

export default function PlayPage() {
    const [mode, setMode] = useState<'setup' | 'play' | 'review'>('setup');

    return (
        <main>
            {mode === 'setup' && <SetUp onStart={() => setMode('play')} />}
            {mode === 'play' && <Play/>}
            {mode === 'review' && <div>Review Mode</div>}
        </main>
    )
}