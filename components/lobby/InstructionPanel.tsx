
import { motion, AnimatePresence } from "framer-motion";
import { Code, AlertTriangle, Vote, Trophy, Clock } from "lucide-react";
import { useState } from "react";

export function InstructionPanel() {
    const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed for better UX

    const sections = [
        {
            icon: Code,
            title: "Coding Phase",
            description: "Fix the bug as a team. Write clean code, run tests, and collaborate.",
            color: "var(--color-neon-green)"
        },
        {
            icon: AlertTriangle,
            title: "Sabotage Phase",
            description: "Imposters can inject bugs, alter outputs, or delay compilation.",
            color: "var(--color-neon-red)"
        },
        {
            icon: Vote,
            title: "Voting Phase",
            description: "Discuss who's suspicious. Vote to eject a player.",
            color: "var(--color-neon-blue)"
        },
        {
            icon: Trophy,
            title: "Win Conditions",
            description: "Hackers: Complete the task. Imposters: Prevent completion or eliminate all hackers.",
            color: "var(--color-neon-purple)"
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--color-neon-blue)]/20">
                        <Clock className="w-5 h-5 text-[var(--color-neon-blue)]" />
                    </div>
                    <h3 className="font-bold text-lg text-white">How This Round Works</h3>
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-xs text-gray-500 hover:text-white transition-colors uppercase font-mono"
                >
                    {isCollapsed ? "Show" : "Hide"}
                </button>
            </div>

            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 overflow-hidden"
                    >
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <div key={section.title} className="flex gap-3">
                                    <div
                                        className="p-2 rounded-lg h-fit"
                                        style={{
                                            backgroundColor: `${section.color}10`,
                                            border: `1px solid ${section.color}30`
                                        }}
                                    >
                                        <Icon className="w-4 h-4" style={{ color: section.color }} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm mb-1" style={{ color: section.color }}>
                                            {section.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-xs text-gray-500 font-mono">
                                    Time Limits: Coding (5min) • Discussion (2min) • Voting (1min)
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
