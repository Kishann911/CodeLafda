"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Users2, Bug, Vote, Trophy } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const steps = [
    {
        number: "01",
        icon: Users2,
        title: "Join the Game",
        description: "Create or join a lobby with 6-10 players. Roles are assigned secretly - you're either a Hacker or an Imposter.",
        color: "var(--color-neon-green)"
    },
    {
        number: "02",
        icon: Code2,
        title: "Fix the Code",
        description: "Hackers work together to complete coding challenges and fix bugs in the shared codebase.",
        color: "var(--color-neon-blue)"
    },
    {
        number: "03",
        icon: Bug,
        title: "Sabotage & Deceive",
        description: "Imposters secretly introduce bugs, break tests, and blend in while sabotaging progress.",
        color: "var(--color-neon-red)"
    },
    {
        number: "04",
        icon: Vote,
        title: "Emergency Meetings",
        description: "Call meetings to discuss suspicious activity, debate, and vote to eject suspected imposters.",
        color: "var(--color-neon-purple)"
    },
    {
        number: "05",
        icon: Trophy,
        title: "Victory Conditions",
        description: "Hackers win by completing all tasks. Imposters win by preventing completion or becoming the majority.",
        color: "var(--color-neon-green)"
    }
];

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1
                },
                opacity: 0,
                scale: 0.8
            });

            // Timeline line animation
            gsap.from(".timeline-line", {
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1
                },
                scaleY: 0,
                transformOrigin: "top center",
                ease: "none"
            });

            // Step items stagger
            gsap.from(".step-item", {
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 70%",
                    end: "bottom 30%",
                    scrub: 1
                },
                opacity: 0,
                x: (index) => (index % 2 === 0 ? -100 : 100),
                stagger: 0.2,
                ease: "power2.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 relative z-20 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-neon-blue)]/5 to-transparent" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-24">
                    <div className="inline-block mb-6">
                        <span className="px-4 py-2 border border-[var(--color-neon-green)]/30 rounded-full bg-[var(--color-neon-green)]/10 text-[var(--color-neon-green)] text-sm font-mono tracking-widest uppercase">
                            Game Flow
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">
                        How It Works
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        From lobby to victory - understand the game mechanics
                    </p>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Vertical line */}
                    <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-neon-green)] via-[var(--color-neon-blue)] to-[var(--color-neon-purple)] opacity-30 hidden md:block" />

                    {/* Steps */}
                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <StepItem key={index} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface StepItemProps {
    step: typeof steps[0];
    index: number;
}

function StepItem({ step, index }: StepItemProps) {
    const isEven = index % 2 === 0;
    const Icon = step.icon;

    return (
        <motion.div
            className={`step-item relative grid md:grid-cols-2 gap-8 items-center ${isEven ? "" : "md:flex-row-reverse"
                }`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Content */}
            <div className={`${isEven ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"}`}>
                <div className="inline-block mb-4">
                    <span
                        className="text-6xl md:text-8xl font-black opacity-20"
                        style={{ color: step.color }}
                    >
                        {step.number}
                    </span>
                </div>

                <h3 className="text-3xl font-bold mb-4 text-white">
                    {step.title}
                </h3>

                <p className="text-gray-400 text-lg leading-relaxed">
                    {step.description}
                </p>
            </div>

            {/* Icon */}
            <div className={`${isEven ? "md:col-start-2" : "md:col-start-1 md:row-start-1"} flex ${isEven ? "justify-start md:pl-12" : "justify-start md:justify-end md:pr-12"}`}>
                <motion.div
                    className="relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <div
                        className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center border-2 backdrop-blur-md relative overflow-hidden group"
                        style={{
                            borderColor: step.color,
                            background: `linear-gradient(135deg, ${step.color}15, transparent)`
                        }}
                    >
                        {/* Glow effect */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                            style={{ background: step.color }}
                        />

                        <Icon className="w-12 h-12 md:w-16 md:h-16 relative z-10" style={{ color: step.color }} />
                    </div>

                    {/* Connecting dot on timeline (desktop only) */}
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-[var(--color-background)]"
                        style={{
                            background: step.color,
                            [isEven ? "right" : "left"]: "-70px",
                            boxShadow: `0 0 20px ${step.color}`
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}
