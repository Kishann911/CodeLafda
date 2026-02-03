"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Play, Terminal, ShieldAlert, Users } from "lucide-react";

export const OnboardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const hasOnboarded = localStorage.getItem("codelafda_onboarded");
        if (!hasOnboarded) {
            if (!hasOnboarded) {
                setTimeout(() => setIsOpen(true), 0);
            }
        }
    }, []);

    const handleComplete = () => {
        localStorage.setItem("codelafda_onboarded", "true");
        setIsOpen(false);
    };

    const steps = [
        {
            title: "Welcome to CodeLafda",
            content: "You are entering a high-stakes simulation involving collaborative coding and social engineering. Your objective depends on your role.",
            icon: <Terminal className="w-12 h-12 text-[var(--color-neon-blue)]" />,
            color: "var(--color-neon-blue)"
        },
        {
            title: "Know Your Role",
            content: "HACKERS must fix the codebase and pass all tests. IMPOSTORS must sabotage execution without getting caught.",
            icon: <ShieldAlert className="w-12 h-12 text-[var(--color-neon-red)]" />,
            color: "var(--color-neon-red)"
        },
        {
            title: "The Interface",
            content: "Use the EDITOR (Left) to write Python code. Watch the TERMINAL (Center) for output. Use SQUAD LIST (Right) to identify threats.",
            icon: <Users className="w-12 h-12 text-[var(--color-neon-purple)]" />,
            color: "var(--color-neon-purple)"
        },
        {
            title: "Trust No One",
            content: "If the code breaks, investigate the logs for errors. Discuss with your squad. Vote to eject the suspected saboteur.",
            icon: <Play className="w-12 h-12 text-[var(--color-neon-green)]" />,
            color: "var(--color-neon-green)"
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg bg-black border-2 border-white/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                {/* Progress Bar */}
                <div className="h-1 bg-white/10 w-full flex">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className="h-full flex-1 transition-all duration-300"
                            style={{
                                backgroundColor: i <= step ? steps[step].color : 'transparent',
                                opacity: i <= step ? 1 : 0.2
                            }}
                        />
                    ))}
                </div>

                <div className="p-8 flex flex-col items-center text-center">

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center"
                        >
                            <div className="mb-6 p-6 rounded-full bg-white/5 border border-white/5 shadow-2xl">
                                {steps[step].icon}
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-4" style={{ color: steps[step].color }}>
                                {steps[step].title}
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8 min-h-[5rem]">
                                {steps[step].content}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="w-full flex gap-4">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="px-6 py-3 border border-white/10 rounded font-bold uppercase text-gray-500 hover:text-white hover:border-white/30 transition-colors"
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={() => {
                                if (step < steps.length - 1) setStep(s => s + 1);
                                else handleComplete();
                            }}
                            className="flex-1 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {step < steps.length - 1 ? (
                                <>Next <ChevronRight className="w-4 h-4" /></>
                            ) : (
                                <>Initialize <Check className="w-4 h-4 text-green-600" /></>
                            )}
                        </button>
                    </div>

                    <button onClick={handleComplete} className="mt-6 text-xs text-gray-600 uppercase hover:text-white transition-colors">
                        Skip Briefing
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
