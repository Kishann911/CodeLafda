"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface RoleRevealProps {
    role: string;
    onComplete: () => void;
}

export const RoleReveal = ({ role, onComplete }: RoleRevealProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (role === 'HACKER') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00ff41', '#ffffff']
            });
        }

        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 500); // Wait for exit anim
        }, 3000);

        return () => clearTimeout(timer);
    }, [role, onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
                    data-animation="role-reveal"
                    data-role={role}
                >
                    <motion.div
                        initial={{ scale: 0.5, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl text-gray-400 uppercase tracking-widest mb-4">You are a</h2>
                        <h1 className={`text-7xl md:text-9xl font-black uppercase tracking-tighter ${role === 'IMPOSTOR' ? 'text-[var(--color-neon-red)] drop-shadow-[0_0_30px_rgba(255,0,60,0.6)]' : 'text-[var(--color-neon-green)] drop-shadow-[0_0_30px_rgba(0,255,65,0.6)]'}`}>
                            {role}
                        </h1>
                        <p className="mt-8 text-xl text-white font-mono max-w-xl mx-auto">
                            {role === 'IMPOSTOR'
                                ? "Sabotage the code. Remain undetected. Don't get caught."
                                : "Fix the bugs. Verify the logic. Trust no one."}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
