"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const PhaseAnnouncement = ({ phase }: { phase: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const tl = gsap.timeline();

        // Reset
        gsap.set(containerRef.current, { opacity: 1, scale: 1 });
        gsap.set(textRef.current, { y: 100, opacity: 0 });

        // Animate In
        tl.to(containerRef.current, {
            duration: 0.1,
            backgroundColor: "rgba(0,0,0,0.8)",
        })
            .to(textRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power4.out",
            })
            // Hold
            .to(textRef.current, {
                scale: 1.1,
                duration: 2,
                ease: "linear"
            }, "-=0.5")
            // Animate Out
            .to(textRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.3,
                pointerEvents: "none"
            });

    }, [phase]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/80"
            data-animation="phase-announcement"
            data-phase={phase}
        >
            <h1 ref={textRef} className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                {phase === 'SABOTAGE' ? <span className="text-[var(--color-neon-red)]">⚠ {phase} ⚠</span> : phase}
            </h1>
        </div>
    );
};
