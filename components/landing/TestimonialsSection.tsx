"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
    {
        quote: "This is Among Us meets LeetCode, and I'm absolutely hooked! The tension when you're trying to fix a bug while suspecting your teammate is incredible.",
        author: "Sarah Chen",
        role: "Senior Developer",
        avatar: "SC",
        color: "var(--color-neon-green)"
    },
    {
        quote: "Finally, a game that combines my love for coding with social deduction. Perfect for team building with fellow devs!",
        author: "Marcus Johnson",
        role: "Tech Lead",
        avatar: "MJ",
        color: "var(--color-neon-blue)"
    },
    {
        quote: "The sabotage mechanics are genius. Watching someone subtly introduce a memory leak had me dying laughing.",
        author: "Priya Patel",
        role: "Full Stack Engineer",
        avatar: "PP",
        color: "var(--color-neon-purple)"
    },
    {
        quote: "Best coding game I've ever played. The real-time collaboration and voting system creates such intense moments.",
        author: "Alex Rivera",
        role: "Software Architect",
        avatar: "AR",
        color: "var(--color-neon-red)"
    }
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal scroll effect
            const cards = gsap.utils.toArray(".testimonial-card");

            gsap.to(cards, {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: 1
                },
                x: (index) => -50 + (index * 10),
                stagger: 0.1,
                ease: "none"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Title */}
                <div className="text-center mb-20">
                    <div className="inline-block mb-6">
                        <span className="px-4 py-2 border border-[var(--color-neon-blue)]/30 rounded-full bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)] text-sm font-mono tracking-widest uppercase">
                            Community Voices
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">
                        What Players Say
                    </h2>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Join thousands of developers who&apos;ve discovered their new favorite game
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface TestimonialCardProps {
    testimonial: typeof testimonials[0];
    index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="testimonial-card group relative p-8 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl hover:border-[var(--hover-color)] transition-all duration-300 overflow-hidden"
            style={{ "--hover-color": testimonial.color } as React.CSSProperties}
        >
            {/* Background gradient on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(circle at top right, ${testimonial.color}15, transparent 70%)`
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Quote icon */}
                <div className="mb-6">
                    <Quote
                        className="w-10 h-10 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                        style={{ color: testimonial.color }}
                    />
                </div>

                {/* Quote text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    &quot;{testimonial.quote}&quot;
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-black"
                        style={{ background: testimonial.color }}
                    >
                        {testimonial.avatar}
                    </div>

                    <div>
                        <p className="font-bold text-white">
                            {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500 font-mono">
                            {testimonial.role}
                        </p>
                    </div>
                </div>
            </div>

            {/* Corner decoration */}
            <div
                className="absolute bottom-0 left-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(45deg, ${testimonial.color}, transparent)`,
                    clipPath: "polygon(0 100%, 100% 100%, 0 0)"
                }}
            />
        </motion.div>
    );
}
