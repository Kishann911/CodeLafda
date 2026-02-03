"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const GlitchOverlay = ({ active }: { active: boolean }) => {
    if (!active) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden mix-blend-exclusion"
            data-effect="glitch-overlay"
            data-active={active}
        >
            {/* Random Slice Glitches */}
            {[...Array(5)].map((_, i) => (
                <GlitchSlice key={i} />
            ))}

            {/* RGB Split Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-red-500/20 mix-blend-multiply"
                style={{ x: -2, y: 2 }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-blue-500/20 mix-blend-multiply"
                style={{ x: 2, y: -2 }}
            />
        </div>
    );
};

const GlitchSlice = () => {
    // Generate random values once on mount to ensure purity
    const [randoms] = useState(() => ({
        height: Math.random() * 20,
        top: Math.random() * 100,
        x1: (Math.random() - 0.5) * 50,
        x2: (Math.random() - 0.5) * 20
    }));

    return (
        <motion.div
            initial={{
                height: `${randoms.height}%`,
                top: `${randoms.top}%`,
                left: 0,
                right: 0,
                x: 0
            }}
            animate={{
                top: [`${randoms.top}%`, `${(randoms.top + 10) % 100}%`, `${randoms.top}%`],
                x: [0, randoms.x1, 0, randoms.x2],
                backgroundColor: ['rgba(0,0,0,0)', 'rgba(255,255,255,0.1)', 'rgba(255,0,60,0.2)'],
            }}
            transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
            }}
            className="absolute bg-white/10 backdrop-invert"
        />
    )
}
