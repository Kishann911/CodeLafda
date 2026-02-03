"use client";

import { motion } from "framer-motion";
import { Trophy, RefreshCcw, Skull } from "lucide-react";
import { useProgression } from "@/hooks/useProgression";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface ResultModalProps {
    winner: 'HACKERS' | 'IMPOSTORS';
    role: string | undefined;
    onPlayAgain: () => void;
}

export const ResultModal = ({ winner, role, onPlayAgain }: ResultModalProps) => {
    const { xp, rank, awardXp, nextRank, progress } = useProgression();
    const [xpGained, setXpGained] = useState(0);

    const isWinner = (winner === 'HACKERS' && role === 'HACKER') || (winner === 'IMPOSTORS' && role === 'IMPOSTOR');

    useEffect(() => {
        // Calculate XP
        const gain = isWinner ? 100 : 25;

        // Delay to avoid synchronous render warning
        setTimeout(() => setXpGained(gain), 0);

        // Delay slightly to allow animation
        const timer = setTimeout(() => {
            awardXp(gain);
            if (isWinner) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: winner === 'HACKERS' ? ['#00ff41', '#ffffff'] : ['#ff003c', '#ffffff']
                });
            }
        }, 500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            data-testid="result-modal-overlay"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full p-8 rounded-2xl border-2 border-white/10 bg-black relative overflow-hidden text-center"
                data-testid="result-modal"
                data-winner={winner}
                data-player-role={role}
                data-is-winner={isWinner}
            >
                {/* Background Glow */}
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${winner === 'HACKERS' ? 'from-green-500 to-transparent' : 'from-red-500 to-transparent'}`} />

                <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        className="mb-6"
                    >
                        {isWinner ? (
                            <Trophy className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        ) : (
                            <Skull className="w-20 h-20 text-gray-500" />
                        )}
                    </motion.div>

                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">
                        {isWinner ? 'Victory' : 'Defeat'}
                    </h1>

                    <p className="text-sm font-mono tracking-widest text-gray-400 mb-8 uppercase">
                        {winner === 'HACKERS' ? 'System Secured' : 'Malware Uploaded'}
                    </p>

                    {/* XP Progress */}
                    <div className="w-full bg-white/5 rounded-lg p-4 mb-8 border border-white/5">
                        <div className="flex justify-between text-xs font-bold uppercase mb-2">
                            <span className={rank.color}>{rank.title}</span>
                            <span>{xp} XP</span>
                        </div>
                        <div className="h-2 bg-black rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: `${progress - (xpGained / (nextRank?.threshold || 1000) * 100)}%` }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={`h-full ${isWinner ? 'bg-yellow-400' : 'bg-gray-500'}`}
                            />
                        </div>
                        <div className="text-[10px] text-right mt-1 text-gray-500">
                            Next Rank: {nextRank?.title || 'MAX'}
                        </div>
                        <div className="mt-2 text-xs font-mono text-[var(--color-neon-blue)]">
                            +{xpGained} XP Gained
                        </div>
                    </div>

                    <button
                        onClick={onPlayAgain}
                        className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Return to Lobby
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
