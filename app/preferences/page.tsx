"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Code, Database, Server, Wallet, Braces, type LucideIcon } from "lucide-react";
import { TechStackCard } from "@/components/preferences/TechStackCard";
import { TechStack, SkillLevel, GameMode, PlayerPreferences } from "@/party/schema";
import Link from "next/link";

interface StackOption {
    name: TechStack;
    category: string;
    description: string;
    icon: LucideIcon;
}

const TECH_STACKS: StackOption[] = [
    // Frontend
    { name: 'React', category: 'Frontend', description: 'Component-based UI library', icon: Code },
    { name: 'Vue', category: 'Frontend', description: 'Progressive framework', icon: Code },
    { name: 'Angular', category: 'Frontend', description: 'Full-featured framework', icon: Code },
    { name: 'Next.js', category: 'Frontend', description: 'React with SSR', icon: Code },
    { name: 'Svelte', category: 'Frontend', description: 'Compiled framework', icon: Code },

    // Backend
    { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime', icon: Server },
    { name: 'Django', category: 'Backend', description: 'Python web framework', icon: Server },
    { name: 'Flask', category: 'Backend', description: 'Lightweight Python', icon: Server },
    { name: 'Spring Boot', category: 'Backend', description: 'Java enterprise', icon: Server },
    { name: 'Ruby on Rails', category: 'Backend', description: 'Ruby framework', icon: Server },

    // Database
    { name: 'MongoDB', category: 'Database', description: 'NoSQL document DB', icon: Database },
    { name: 'PostgreSQL', category: 'Database', description: 'Relational database', icon: Database },
    { name: 'MySQL', category: 'Database', description: 'Popular SQL DB', icon: Database },
    { name: 'Redis', category: 'Database', description: 'In-memory cache', icon: Database },

    // Web3
    { name: 'Solidity', category: 'Web3', description: 'Smart contract language', icon: Wallet },
    { name: 'Smart Contract Security', category: 'Web3', description: 'Audit & vulnerabilities', icon: Wallet },
    { name: 'Gas Optimization', category: 'Web3', description: 'Reduce transaction costs', icon: Wallet },
    { name: 'Wallet Integration', category: 'Web3', description: 'Connect to Web3 wallets', icon: Wallet },

    // Languages
    { name: 'JavaScript', category: 'Languages', description: 'Web scripting language', icon: Braces },
    { name: 'TypeScript', category: 'Languages', description: 'Typed JavaScript', icon: Braces },
    { name: 'Python', category: 'Languages', description: 'General-purpose language', icon: Braces },
    { name: 'Java', category: 'Languages', description: 'Enterprise language', icon: Braces },
    { name: 'C++', category: 'Languages', description: 'System programming', icon: Braces },
    { name: 'Rust', category: 'Languages', description: 'Memory-safe systems', icon: Braces },
    { name: 'Go', category: 'Languages', description: 'Concurrent language', icon: Braces },
];

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Web3', 'Languages'];

export default function PreferencesPage() {
    const router = useRouter();
    const [selectedStacks, setSelectedStacks] = useState<TechStack[]>([]);
    const [skillLevel, setSkillLevel] = useState<SkillLevel>('Intermediate');
    const [gameMode, setGameMode] = useState<GameMode>('Multi-Stack');

    const toggleStack = (stack: TechStack) => {
        setSelectedStacks(prev =>
            prev.includes(stack)
                ? prev.filter(s => s !== stack)
                : [...prev, stack]
        );
    };

    const handleSaveAndContinue = () => {
        if (selectedStacks.length === 0) {
            alert("Please select at least one tech stack");
            return;
        }

        const preferences: PlayerPreferences = {
            techStacks: selectedStacks,
            skillLevel,
            gameMode,
        };

        // Store in localStorage
        localStorage.setItem('codelafda_preferences', JSON.stringify(preferences));

        // Navigate to lobby
        router.push('/lobby');
    };

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-white p-8 overflow-y-auto">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />
            <div className="fixed top-0 left-0 w-96 h-96 bg-[var(--color-neon-blue)]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-[var(--color-neon-purple)]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="inline-block py-1 px-3 border border-[var(--color-neon-green)]/30 rounded-full bg-[var(--color-neon-green)]/10 text-[var(--color-neon-green)] text-xs font-mono tracking-widest uppercase mb-4">
                        Step 1 of 2
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        PERSONALIZE YOUR BATTLE
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Select your tech stack preferences. Questions will be tailored to your expertise.
                    </p>
                </motion.div>

                {/* Skill Level & Game Mode Selectors */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
                >
                    {/* Skill Level */}
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                        <label className="block text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">
                            Skill Level
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map(level => (
                                <button
                                    key={level}
                                    onClick={() => setSkillLevel(level)}
                                    className={`py-3 px-4 rounded-lg font-bold text-sm transition-all ${skillLevel === level
                                        ? 'bg-[var(--color-neon-blue)] text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Game Mode */}
                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                        <label className="block text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">
                            Game Mode
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['Single Stack', 'Multi-Stack', 'Dynamic'] as GameMode[]).map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setGameMode(mode)}
                                    className={`py-3 px-4 rounded-lg font-bold text-sm transition-all ${gameMode === mode
                                        ? 'bg-[var(--color-neon-purple)] text-black'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Tech Stacks by Category */}
                {CATEGORIES.map((category, categoryIndex) => {
                    const stacksInCategory = TECH_STACKS.filter(s => s.category === category);

                    return (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                            className="mb-10"
                        >
                            <h2 className="text-2xl font-bold mb-4 font-mono uppercase tracking-wide text-[var(--color-neon-green)]">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {stacksInCategory.map(stack => (
                                    <TechStackCard
                                        key={stack.name}
                                        name={stack.name}
                                        category={stack.category}
                                        description={stack.description}
                                        icon={stack.icon}
                                        isSelected={selectedStacks.includes(stack.name)}
                                        onToggle={() => toggleStack(stack.name)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    );
                })}

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 flex items-center justify-between sticky bottom-8 bg-[var(--color-background)]/80 backdrop-blur-xl p-6 rounded-xl border border-white/10"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-mono text-gray-400">
                            Selected: <span className="text-[var(--color-neon-green)] font-bold">{selectedStacks.length}</span> stacks
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="px-6 py-3 border border-white/20 hover:border-white/40 text-gray-400 hover:text-white font-mono text-sm uppercase transition-all"
                        >
                            Back
                        </Link>
                        <button
                            onClick={handleSaveAndContinue}
                            disabled={selectedStacks.length === 0}
                            className="group relative px-8 py-3 bg-[var(--color-neon-green)] text-black font-bold uppercase tracking-wider overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                        >
                            <span className="relative z-10">Save & Continue</span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
