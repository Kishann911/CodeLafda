"use client";

import { motion } from "framer-motion";
import { LoadingProgress } from "@/party/schema";
import { Loader2, CheckCircle2, AlertCircle, Code, FileCode, Users, Play } from "lucide-react";

interface LoadingPhaseProps {
    progress: LoadingProgress;
    onRetry?: () => void;
}

export function LoadingPhase({ progress, onRetry }: LoadingPhaseProps) {
    const { phase, message, progress: percentage, error } = progress;

    const iconElement = getPhaseIcon(phase, "w-8 h-8 text-[var(--color-neon-blue)]");

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center"
            >
                <div className="max-w-md w-full mx-4">
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="bg-[var(--color-surface)] border-2 border-[var(--color-neon-red)]/50 rounded-xl p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                        >
                            <AlertCircle className="w-16 h-16 text-[var(--color-neon-red)] mx-auto mb-4" />
                        </motion.div>

                        <h2 className="text-2xl font-bold text-[var(--color-neon-red)] mb-2 uppercase tracking-wider">
                            Start Failed
                        </h2>

                        <p className="text-gray-400 mb-6">
                            {error}
                        </p>

                        {onRetry && (
                            <button
                                onClick={onRetry}
                                className="px-6 py-3 bg-[var(--color-neon-green)] text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                            >
                                Try Again
                            </button>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center"
        >
            <div className="max-w-2xl w-full mx-4">
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-[var(--color-surface)] border border-white/10 rounded-xl p-12"
                >
                    {/* Phase Indicator */}
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-3 mb-8"
                    >
                        <motion.div
                            animate={{ rotate: phase === 'LOAD_COMPILERS' ? 360 : 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="p-3 rounded-lg bg-[var(--color-neon-blue)]/20"
                        >
                            {iconElement}
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                            {getPhaseLabel(phase)}
                        </h2>
                    </motion.div>

                    {/* Status Message */}
                    <motion.p
                        key={message}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-gray-400 mb-8 text-lg"
                    >
                        {message}
                    </motion.p>

                    {/* Progress Bar */}
                    <div className="relative h-3 bg-white/5 rounded-full overflow-hidden mb-6">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-green)]"
                        />

                        {/* Animated glow */}
                        <motion.div
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                    </div>

                    {/* Progress Percentage */}
                    <div className="text-center font-mono text-2xl font-bold text-[var(--color-neon-green)]">
                        {percentage}%
                    </div>

                    {/* Phase Checklist */}
                    <div className="mt-8 space-y-2">
                        {(['PREPARE', 'LOAD_COMPILERS', 'LOAD_QUESTIONS', 'ASSIGN_IMPOSTER', 'START_ROUND'] as const).map((p) => (
                            <PhaseChecklistItem
                                key={p}
                                phase={p}
                                isComplete={getPhaseOrder(p) < getPhaseOrder(phase)}
                                isCurrent={p === phase}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function PhaseChecklistItem({
    phase,
    isComplete,
    isCurrent
}: {
    phase: string;
    isComplete: boolean;
    isCurrent: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{
                opacity: isCurrent || isComplete ? 1 : 0.3,
                x: isCurrent ? [0, 5, 0] : 0
            }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-3 text-sm ${isComplete ? 'text-[var(--color-neon-green)]' :
                isCurrent ? 'text-white' :
                    'text-gray-600'
                }`}
        >
            {isComplete ? (
                <CheckCircle2 className="w-4 h-4" />
            ) : isCurrent ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <div className="w-4 h-4 rounded-full border border-current" />
            )}
            <span className="font-mono uppercase tracking-wider">
                {getPhaseLabel(phase)}
            </span>
        </motion.div>
    );
}

function getPhaseLabel(phase: string): string {
    const labels: Record<string, string> = {
        'PREPARE': 'Validating Setup',
        'LOAD_COMPILERS': 'Loading Compiler',
        'LOAD_QUESTIONS': 'Selecting Challenge',
        'ASSIGN_IMPOSTER': 'Assigning Roles',
        'START_ROUND': 'Starting Match'
    };
    return labels[phase] || phase;
}

function getPhaseOrder(phase: string): number {
    const order = ['PREPARE', 'LOAD_COMPILERS', 'LOAD_QUESTIONS', 'ASSIGN_IMPOSTER', 'START_ROUND'];
    return order.indexOf(phase);
}

function getPhaseIcon(phase: string, className: string) {
    switch (phase) {
        case 'PREPARE': return <Users className={className} />;
        case 'LOAD_COMPILERS': return <Code className={className} />;
        case 'LOAD_QUESTIONS': return <FileCode className={className} />;
        case 'ASSIGN_IMPOSTER': return <Users className={className} />;
        case 'START_ROUND': return <Play className={className} />;
        default: return <Loader2 className={className} />;
    }
}
