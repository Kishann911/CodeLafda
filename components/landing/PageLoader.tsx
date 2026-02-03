"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulate loading progress
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = 100 / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= 100) {
                setProgress(100);
                clearInterval(timer);

                // Delay before hiding loader
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            } else {
                setProgress(Math.floor(current));
            }
        }, duration / steps);

        // GSAP animations for loader
        const ctx = gsap.context(() => {
            // Glitch effect on text
            gsap.to(".loader-text", {
                x: 2,
                duration: 0.1,
                repeat: -1,
                yoyo: true,
                repeatDelay: 1,
                ease: "none"
            });

            // Pulse effect on progress bar
            gsap.to(".progress-glow", {
                opacity: 0.8,
                scale: 1.1,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, loaderRef);

        return () => {
            clearInterval(timer);
            ctx.revert();
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    ref={loaderRef}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] bg-[var(--color-background)] flex items-center justify-center"
                    style={{ pointerEvents: isLoading ? "auto" : "none" }}
                >
                    {/* Background effects */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Animated grid */}
                        <div className="absolute inset-0 opacity-10">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "linear-gradient(var(--color-neon-green) 1px, transparent 1px), linear-gradient(90deg, var(--color-neon-green) 1px, transparent 1px)",
                                    backgroundSize: "50px 50px",
                                    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)"
                                }}
                            />
                        </div>

                        {/* Radial glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-neon-green)]/10 rounded-full blur-[100px]" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Logo/Title */}
                            <h1 className="loader-text text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-neon-green)] to-white">
                                CODELAFDA
                            </h1>

                            {/* Loading text */}
                            <div className="mb-8">
                                <p className="text-[var(--color-neon-green)] font-mono text-sm tracking-widest uppercase mb-2">
                                    Initializing Game Engine
                                </p>
                                <p className="text-gray-500 font-mono text-xs">
                                    {progress < 30 ? "Loading assets..." :
                                        progress < 60 ? "Compiling code..." :
                                            progress < 90 ? "Establishing connection..." :
                                                "Ready to launch..."}
                                </p>
                            </div>

                            {/* Progress bar */}
                            <div className="w-64 md:w-96 mx-auto">
                                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                                    {/* Progress fill */}
                                    <motion.div
                                        ref={progressBarRef}
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-blue)]"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Glow effect */}
                                    <motion.div
                                        className="progress-glow absolute left-0 top-0 h-full bg-[var(--color-neon-green)] blur-md"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                {/* Percentage */}
                                <p className="mt-3 text-white font-mono text-sm">
                                    {progress}%
                                </p>
                            </div>

                            {/* Decorative elements */}
                            <div className="mt-12 flex justify-center gap-2">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 h-2 bg-[var(--color-neon-green)] rounded-full"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
