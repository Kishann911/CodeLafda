"use client";

import { motion, AnimatePresence } from "framer-motion";
const variants = {
    fade: {
        initial: { opacity: 0, filter: "blur(10px)" },
        animate: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5 } },
        exit: { opacity: 0, filter: "blur(10px)", transition: { duration: 0.3 } }
    },
    slide: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
    },
    cyber: {
        initial: { opacity: 0, scale: 0.95, filter: "brightness(200%)" },
        animate: { opacity: 1, scale: 1, filter: "brightness(100%)", transition: { duration: 0.4 } },
        exit: { opacity: 0, scale: 1.05, filter: "brightness(50%)", transition: { duration: 0.2 } }
    }
} as const;

interface CinematicTransitionProps {
    children: React.ReactNode;
    mode?: 'fade' | 'slide' | 'cyber';
    className?: string;
    triggerKey?: string | number; // Key to trigger re-animation
}

export function CinematicTransition({ children, mode = 'fade', className, triggerKey }: CinematicTransitionProps) {
    const key = triggerKey || "static";

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={key}
                variants={variants[mode]}
                initial="initial"
                animate="animate"
                exit="exit"
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
