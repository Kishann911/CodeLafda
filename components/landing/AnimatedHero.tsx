"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { splitTextIntoChars } from "@/lib/textSplit";

export default function AnimatedHero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create timeline for orchestrated animations
            const tl = gsap.timeline({
                defaults: { ease: "power4.out" }
            });

            // Animate background entrance
            tl.from(heroRef.current, {
                opacity: 0,
                duration: 1
            });

            // Split text animation for title
            if (titleRef.current) {
                const chars = splitTextIntoChars(titleRef.current);
                tl.from(chars, {
                    opacity: 0,
                    y: 100,
                    rotateX: -90,
                    stagger: 0.02,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, "-=0.5");
            }

            // Subtitle glitch effect
            if (subtitleRef.current) {
                tl.from(subtitleRef.current, {
                    opacity: 0,
                    x: -50,
                    duration: 0.8
                }, "-=0.6");

                // Glitch loop
                gsap.to(subtitleRef.current, {
                    x: 2,
                    duration: 0.1,
                    repeat: -1,
                    yoyo: true,
                    repeatDelay: 3,
                    ease: "none"
                });
            }

            // Description fade in
            if (descriptionRef.current) {
                tl.from(descriptionRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 1
                }, "-=0.3");
            }

            // CTA buttons
            if (ctaRef.current) {
                gsap.set(ctaRef.current.children, { autoAlpha: 0, y: 20 });
                tl.to(ctaRef.current.children, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.1,
                    duration: 0.6
                }, "-=0.5");
            }

            // Floating animation for badge
            gsap.to(".badge-float", {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20"
        >
            {/* Background GIF with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/img12.gif"
                    alt="Cyberpunk Glitch Background"
                    fill
                    className="object-cover opacity-60 mix-blend-screen"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)] z-10" />
                <div className="absolute inset-0 bg-[var(--color-background)]/70 z-10 backdrop-blur-[2px]" />

                {/* Scanline Effect */}
                <div
                    className="absolute inset-0 z-20 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))",
                        backgroundSize: "100% 4px"
                    }}
                />

                {/* Animated Grid */}
                <div className="absolute inset-0 z-5 opacity-20">
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: "linear-gradient(var(--color-neon-green) 1px, transparent 1px), linear-gradient(90deg, var(--color-neon-green) 1px, transparent 1px)",
                            backgroundSize: "50px 50px",
                            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)"
                        }}
                    />
                </div>
            </div>

            {/* Hero Content */}
            <div className="relative z-30 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
                {/* Badge */}
                <div className="mb-6">
                    <span className="badge-float inline-block py-1.5 px-4 border border-[var(--color-neon-blue)]/30 rounded-full bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)] text-xs font-mono tracking-widest uppercase shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                        System Online // Version 2.0
                    </span>
                </div>

                {/* Title */}
                <h1
                    ref={titleRef}
                    className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-white"
                    style={{
                        textShadow: "0 0 40px rgba(0, 255, 65, 0.3), 0 0 80px rgba(0, 243, 255, 0.2)"
                    }}
                >
                    CODELAFDA
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl font-mono text-[var(--color-neon-green)] tracking-tight text-glow-green mb-8"
                >
                    &lt;Code. Betray. Debug. /&gt;
                </p>

                {/* Description */}
                <p
                    ref={descriptionRef}
                    className="text-gray-400 max-w-2xl mx-auto mb-12 text-base md:text-lg leading-relaxed text-center"
                >
                    The ultimate social-deduction coding game. Fix the codebase with your team,
                    or sabotage it from within. Trust no one. Commit nothing without review.
                </p>

                {/* CTA Buttons */}
                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
                >
                    <Link
                        href="/lobby"
                        className="group relative px-10 py-4 bg-[var(--color-neon-green)] text-black font-bold text-base uppercase tracking-wider overflow-hidden rounded hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(0,255,65,0.3)]"
                    >
                        <span className="relative z-10 flex items-center gap-2 justify-center">
                            Initialize Sequence <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>

                    <Link
                        href="/documentation"
                        className="relative z-50 px-10 py-4 border-2 border-[var(--color-neon-blue)] bg-black text-[var(--color-neon-blue)] font-bold text-base uppercase tracking-wider overflow-hidden rounded hover:bg-[var(--color-neon-blue)] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.2)] flex items-center justify-center"
                    >
                        Read Documentation
                    </Link>
                </div>
            </div>


        </section>
    );
}
