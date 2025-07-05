'use client';

import { usePlaySession } from "@/app/components/play/PlaySessionContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingStart() {
  const playSession = usePlaySession();
  const [secondsLeft, setSecondsLeft] = useState<number>(3.0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 0.1));
    }, 100);

    const timeout = setTimeout(() => {
      playSession.startGame();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [playSession]);

  const percent = ((3 - secondsLeft) / 3) * 100;

  return (
    <div className="min-h-screen w-full bg-amber-100 text-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center space-y-6 p-8 bg-white/80 rounded-3xl shadow-xl border border-amber-200 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-stone-800">Get Ready to Play!</h1>
        <p className="text-stone-600 text-lg">
          Starting in <span className="font-semibold text-amber-600">{secondsLeft.toFixed(1)}</span> seconds...
        </p>

        <div className="relative w-full h-12 mt-4">
          {/* Loading bar */}
          <div className="absolute top-4 w-full h-4 bg-stone-300 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Walking gif */}
          {/* <motion.img
            src={"/assets/fast-walking-cat.gif"} // change this to whatever gif you want!
            alt="walking cat"
            className="absolute -top-2 w-8 h-8 transform scaleX(-1)"
            initial={{ left: 0 }}
            animate={{ left: `${percent}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          /> */}
        </div>
      </div>
    </div>
  );
}
