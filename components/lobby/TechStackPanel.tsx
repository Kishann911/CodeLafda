import { motion } from "framer-motion";
import { TechStack } from "@/party/schema";
import { Code, Database, Server, Wallet, Braces } from "lucide-react";

interface TechStackPanelProps {
    selectedStacks: TechStack[];
}

export function TechStackPanel({ selectedStacks }: TechStackPanelProps) {
    const getIconForCategory = (stack: TechStack) => {
        // Frontend
        if (['React', 'Vue', 'Angular', 'Next.js', 'Svelte'].includes(stack)) return Code;
        // Backend
        if (['Node.js', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails'].includes(stack)) return Server;
        // Database
        if (['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'].includes(stack)) return Database;
        // Web3
        if (['Solidity', 'Smart Contract Security', 'Gas Optimization', 'Wallet Integration'].includes(stack)) return Wallet;
        // Languages
        return Braces;
    };

    const getCategoryColor = (stack: TechStack) => {
        if (['React', 'Vue', 'Angular', 'Next.js', 'Svelte'].includes(stack)) return 'var(--color-neon-blue)';
        if (['Node.js', 'Django', 'Flask', 'Spring Boot', 'Ruby on Rails'].includes(stack)) return 'var(--color-neon-green)';
        if (['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'].includes(stack)) return 'var(--color-neon-purple)';
        if (['Solidity', 'Smart Contract Security', 'Gas Optimization', 'Wallet Integration'].includes(stack)) return 'var(--color-neon-red)';
        return '#efff00';
    };

    return (
        <div id="tech-stack-panel" className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10">
                <h2 className="font-bold text-lg mb-1">Selected Stacks</h2>
                <p className="text-xs text-gray-500 font-mono">
                    {selectedStacks.length} technologies in this match
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {selectedStacks.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-600 text-sm font-mono">
                        Waiting for players...
                    </div>
                ) : (
                    <div className="space-y-2">
                        {selectedStacks.map((stack, index) => {
                            const Icon = getIconForCategory(stack);
                            const color = getCategoryColor(stack);

                            return (
                                <motion.div
                                    key={stack}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                                >
                                    <div
                                        className="p-2 rounded-lg"
                                        style={{
                                            backgroundColor: `${color}10`,
                                            border: `1px solid ${color}30`
                                        }}
                                    >
                                        <Icon className="w-4 h-4" style={{ color }} />
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-sm font-medium">{stack}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Match Info */}
            {selectedStacks.length > 0 && (
                <div className="p-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-mono uppercase">Difficulty</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(level => (
                                <div
                                    key={level}
                                    className={`w-6 h-2 rounded-full ${level <= Math.min(3, Math.ceil(selectedStacks.length / 5))
                                        ? 'bg-[var(--color-neon-green)]'
                                        : 'bg-white/10'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
