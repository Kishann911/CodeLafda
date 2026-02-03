"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, ShieldAlert, Users, Code, Zap, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const features = [
    {
        icon: Terminal,
        title: "Real-time Editor",
        desc: "Collaborative Monaco editor with live syntax highlighting and execution.",
        color: "blue",
        shadowColor: "rgba(0, 243, 255, 0.1)",
        borderColor: "var(--color-neon-blue)"
    },
    {
        icon: ShieldAlert,
        title: "Sabotage Mechanics",
        desc: "Inject subtle bugs, break tests, or crash the runtime as the imposter.",
        color: "red",
        shadowColor: "rgba(255, 0, 60, 0.1)",
        borderColor: "var(--color-neon-red)"
    },
    {
        icon: Users,
        title: "Social Deduction",
        desc: "Discuss via voice/chat, accuse sus commits, and vote to eject.",
        color: "purple",
        shadowColor: "rgba(189, 0, 255, 0.1)",
        borderColor: "var(--color-neon-purple)"
    },
    {
        icon: Code,
        title: "Live Code Execution",
        desc: "Run and test code in real-time with instant feedback and results.",
        color: "green",
        shadowColor: "rgba(0, 255, 65, 0.1)",
        borderColor: "var(--color-neon-green)"
    },
    {
        icon: Zap,
        title: "Fast-Paced Rounds",
        desc: "Quick 10-minute matches with intense coding and deduction gameplay.",
        color: "blue",
        shadowColor: "rgba(0, 243, 255, 0.1)",
        borderColor: "var(--color-neon-blue)"
    },
    {
        icon: Cpu,
        title: "Multi-Language Support",
        desc: "Code in JavaScript, Python, TypeScript, and more languages.",
        color: "purple",
        shadowColor: "rgba(189, 0, 255, 0.1)",
        borderColor: "var(--color-neon-purple)"
    }
];

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ensure initial state
            gsap.set([titleRef.current, ".feature-card"], { opacity: 0, y: 50 });

            // Title animation
            gsap.to(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                duration: 1
            });

            // Stagger cards animation
            gsap.to(".feature-card", {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out"
            });

            // Floating animation for icons
            gsap.to(".feature-icon", {
                y: -5,
                duration: 2,
                stagger: 0.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">
                        Game Features
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Experience the perfect blend of competitive coding and social deduction
                    </p>
                </div>

                {/* Feature Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    desc: string;
    color: string;
    shadowColor: string;
    borderColor: string;

}

function FeatureCard({ icon: Icon, title, desc, shadowColor, borderColor }: FeatureCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={cardRef}
            className="feature-card group p-8 border border-white/10 bg-white/5 backdrop-blur-md rounded-xl hover:border-[var(--hover-border)] transition-all duration-300 relative overflow-hidden hover:-translate-y-2"
            style={{ "--hover-border": borderColor } as React.CSSProperties}
        >
            {/* Gradient overlay on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at top left, ${shadowColor}, transparent 70%)`
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                <div
                    className="feature-icon mb-6 p-4 rounded-lg bg-black/40 w-fit border border-white/5 shadow-[0_0_20px_var(--shadow-color)] transition-all duration-300 group-hover:scale-110"
                    style={{ "--shadow-color": shadowColor } as React.CSSProperties}
                >
                    <Icon className="w-8 h-8" style={{ color: borderColor }} />
                </div>

                <h3 className="text-xl font-bold mb-3 font-mono uppercase tracking-wide group-hover:text-[var(--hover-border)] transition-colors duration-300">
                    {title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                    {desc}
                </p>
            </div>

            {/* Corner accent */}
            <div
                className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${borderColor}, transparent)`,
                    clipPath: "polygon(100% 0, 100% 100%, 0 0)"
                }}
            />
        </div>
    );
}
