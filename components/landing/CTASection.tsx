"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect
            gsap.to(contentRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: -50
            });

            // Pulse animation for CTA button
            gsap.to(".cta-button", {
                scale: 1.05,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 relative z-20 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-neon-green)]/10 to-[var(--color-background)]" />

                {/* Animated grid */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "linear-gradient(var(--color-neon-green) 1px, transparent 1px), linear-gradient(90deg, var(--color-neon-green) 1px, transparent 1px)",
                            backgroundSize: "100px 100px",
                            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)"
                        }}
                    />
                </div>

                {/* Radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-neon-green)]/20 rounded-full blur-[120px]" />
            </div>

            <div ref={contentRef} className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <div className="mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--color-neon-green)]/30 rounded-full bg-[var(--color-neon-green)]/10 text-[var(--color-neon-green)] text-sm font-mono tracking-widest uppercase">
                        <Sparkles className="w-4 h-4" />
                        Ready to Play?
                    </span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">
                    Start Your First Match
                </h2>

                <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                    Join thousands of developers in the ultimate coding battle.
                    No installation required - jump straight into the action.
                </p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Link
                        href="/lobby"
                        className="cta-button group relative px-10 py-5 bg-[var(--color-neon-green)] text-black font-bold text-lg uppercase tracking-wider overflow-hidden rounded-lg"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            <Sparkles className="w-5 h-5" />
                            Enter Lobby
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        {/* Glow */}
                        <div className="absolute inset-0 bg-[var(--color-neon-green)] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    </Link>

                    <button className="group px-10 py-5 border-2 border-[var(--color-neon-green)]/30 hover:border-[var(--color-neon-green)] text-[var(--color-neon-green)] font-mono text-sm tracking-widest uppercase transition-all duration-300 backdrop-blur-sm rounded-lg relative overflow-hidden">
                        <span className="relative z-10">Watch Tutorial</span>
                        <div className="absolute inset-0 bg-[var(--color-neon-green)]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[var(--color-neon-green)] rounded-full animate-pulse" />
                        <span>Free to Play</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[var(--color-neon-blue)] rounded-full animate-pulse" />
                        <span>No Download Required</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[var(--color-neon-purple)] rounded-full animate-pulse" />
                        <span>Cross-Platform</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
