"use client";

import { Terminal, Activity, ShieldCheck, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

interface StatePanelProps {
    output: string[];
    role: string | undefined;
    phase: string;
    error?: string | null;
}



export const StatePanel = ({ output, role, error }: StatePanelProps) => {
    return (
        <div className="h-full flex flex-col bg-black/50 border-r border-white/10 relative">
            {/* Header */}
            <div className="h-10 flex items-center gap-2 px-4 border-b border-white/5 bg-white/[0.02] text-xs font-bold text-gray-400 uppercase tracking-widest">
                <Activity className="w-3 h-3 text-[var(--color-neon-purple)]" />
                System State
            </div>

            {/* Content Grid */}
            <div className="flex-1 p-4 grid grid-rows-2 gap-4 overflow-hidden">

                {/* Top: Role & Status */}
                <div className="bg-white/5 rounded-lg border border-white/5 p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <h3 className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Assigned Role</h3>
                    <div className={`text-2xl font-black uppercase tracking-tighter ${role === 'IMPOSTOR' ? 'text-[var(--color-neon-red)]' : 'text-[var(--color-neon-green)]'}`}>
                        {role || 'ANALYZING...'}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                        {role === 'IMPOSTOR' ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                        {role === 'IMPOSTOR' ? 'Compromise the system.' : 'Maintain system integrity.'}
                    </div>
                </div>

                {/* Bottom: Terminal Output */}
                <div className="bg-black rounded-lg border border-white/10 flex flex-col overflow-hidden font-mono text-xs shadow-inner">
                    <div className="px-3 py-2 border-b border-white/10 bg-white/5 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-400">
                            <Terminal className="w-3 h-3" /> Console
                        </span>
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500/20" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                            <div className="w-2 h-2 rounded-full bg-green-500/20" />
                        </div>
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto space-y-1 text-gray-300">
                        {output.length === 0 && !error && (
                            <div className="text-gray-700 italic opacity-50 flex flex-col gap-1">
                                <span>Waiting for execution...</span>
                            </div>
                        )}
                        {output.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="break-all"
                            >
                                <span className="text-gray-600 mr-2">$</span>{line}
                            </motion.div>
                        ))}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[var(--color-neon-red)] break-all p-2 bg-[var(--color-neon-red)]/10 border-l-2 border-[var(--color-neon-red)]"
                            >
                                <span className="font-bold">ERR:</span> {error}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};
