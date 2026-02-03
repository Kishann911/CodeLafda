"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const stats = [
    { value: 10000, suffix: "+", label: "Active Players", color: "var(--color-neon-green)" },
    { value: 50000, suffix: "+", label: "Games Played", color: "var(--color-neon-blue)" },
    { value: 98, suffix: "%", label: "Satisfaction Rate", color: "var(--color-neon-purple)" },
    { value: 5, suffix: " min", label: "Avg Game Time", color: "var(--color-neon-red)" }
];

export default function StatsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className="py-32 relative z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <StatItem key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface StatItemProps {
    stat: typeof stats[0];
    index: number;
}

function StatItem({ stat, index }: StatItemProps) {
    const [count, setCount] = useState(0);
    const itemRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.value) {
                    setCount(stat.value);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, stat.value]);

    return (
        <motion.div
            ref={itemRef}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "backOut" }}
            className="text-center group"
        >
            <div className="relative inline-block">
                {/* Glow background */}
                <motion.div
                    className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ background: stat.color }}
                />

                {/* Number */}
                <motion.div
                    className="relative text-5xl md:text-7xl font-black mb-2"
                    style={{ color: stat.color }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {count.toLocaleString()}{stat.suffix}
                </motion.div>
            </div>

            {/* Label */}
            <p className="text-gray-400 text-sm md:text-base font-mono uppercase tracking-wider">
                {stat.label}
            </p>

            {/* Decorative line */}
            <motion.div
                className="mt-4 h-1 mx-auto rounded-full"
                style={{ background: stat.color }}
                initial={{ width: 0 }}
                animate={isInView ? { width: "60%" } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />
        </motion.div>
    );
}
