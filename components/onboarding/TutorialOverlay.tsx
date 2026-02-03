"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Gamepad2, Code2, Users, AlertTriangle } from "lucide-react";

interface TutorialStep {
    title: string;
    description: string;
    icon: React.ElementType;
    targetId?: string; // ID of element to highlight
}

const STEPS: TutorialStep[] = [
    {
        title: "Welcome to CodeLafda",
        description: "A cyberpunk collaborative coding game with social deduction elements. Work together, but trust no one.",
        icon: Gamepad2
    },
    {
        title: "The Lobby",
        description: "Wait for players here. The host will initialize the match once everyone is ready and tech stacks are chosen.",
        icon: Users,
        targetId: "lobby-center"
    },
    {
        title: "Tech Stacks",
        description: "The game adapts to your skills. Questions will be chosen based on the group's combined preferences.",
        icon: Code2,
        targetId: "tech-stack-panel"
    },
    {
        title: "Imposters",
        description: "Watch out! Some players are Imposters who can sabotage code, alter outputs, and delay compilation.",
        icon: AlertTriangle
    }
];

export function TutorialOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem("codelafda_tutorial_seen");
        if (!hasSeenTutorial) {
            // Delay to avoid synchronous state update warning
            setTimeout(() => setIsOpen(true), 0);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("codelafda_tutorial_seen", "true");
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    if (!isOpen) return null;

    const step = STEPS[currentStep];
    const Icon = step.icon;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={handleClose}
                />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-[#0a0a0f] border border-[var(--color-neon-blue)] rounded-xl max-w-lg w-full overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.1)]"
                >
                    {/* Header Image/Icon Area */}
                    <div className="h-32 bg-gradient-to-br from-[var(--color-neon-blue)]/20 to-purple-900/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
                        <motion.div
                            key={step.title}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring" }}
                        >
                            <Icon className="w-16 h-16 text-[var(--color-neon-blue)] drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]" />
                        </motion.div>
                    </div>

                    <div className="p-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-[var(--color-neon-blue)] uppercase tracking-widest">
                                Step {currentStep + 1} / {STEPS.length}
                            </span>
                            <button onClick={handleClose} className="text-gray-500 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <motion.div
                            key={step.title}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="min-h-[120px]"
                        >
                            <h2 className="text-2xl font-bold text-white mb-3">{step.title}</h2>
                            <p className="text-gray-400 leading-relaxed">{step.description}</p>
                        </motion.div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                            <button
                                onClick={handlePrev}
                                disabled={currentStep === 0}
                                className="text-sm font-mono text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </button>

                            <div className="flex gap-2">
                                {STEPS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-[var(--color-neon-blue)]' : 'bg-white/10'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/90 text-black font-bold rounded-lg text-sm flex items-center gap-2 transition-colors"
                            >
                                {currentStep === STEPS.length - 1 ? 'Start Game' : 'Next'}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
