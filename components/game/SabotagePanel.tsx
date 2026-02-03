import { motion } from "framer-motion";
import { AlertTriangle, Bug, FileWarning, Clock } from "lucide-react";
import { SabotagePower, SabotageType } from "@/party/schema";

interface SabotagePanelProps {
    powers: SabotagePower[];
    onSabotage: (type: SabotageType) => void;
}

export function SabotagePanel({ powers, onSabotage }: SabotagePanelProps) {
    const getIcon = (type: SabotageType) => {
        switch (type) {
            case 'INJECT_BUG': return Bug;
            case 'ALTER_OUTPUT': return FileWarning;
            case 'DELAY_COMPILE': return Clock;
            default: return AlertTriangle;
        }
    };

    const getDescription = (type: SabotageType) => {
        switch (type) {
            case 'INJECT_BUG': return 'Inject syntax errors into the code';
            case 'ALTER_OUTPUT': return 'Corrupt test execution results';
            case 'DELAY_COMPILE': return 'Add artificial compilation delay';
            default: return 'Sabotage ability';
        }
    };

    return (
        <div className="p-4 bg-[var(--color-neon-red)]/10 border border-[var(--color-neon-red)]/30 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-[var(--color-neon-red)]" />
                <h3 className="font-bold text-[var(--color-neon-red)] uppercase tracking-wider">
                    Imposter Powers
                </h3>
            </div>

            <div className="space-y-3">
                {powers.map((power) => {
                    const Icon = getIcon(power.type);
                    const isDisabled = power.usesRemaining <= 0 || power.cooldown > 0;

                    return (
                        <motion.button
                            key={power.type}
                            onClick={() => !isDisabled && onSabotage(power.type)}
                            disabled={isDisabled}
                            whileHover={!isDisabled ? { scale: 1.02, x: 2 } : {}}
                            whileTap={!isDisabled ? { scale: 0.98 } : {}}
                            className={`
                                w-full p-3 rounded-lg border transition-all text-left
                                ${isDisabled
                                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                                    : 'bg-[var(--color-neon-red)]/20 border-[var(--color-neon-red)]/50 hover:bg-[var(--color-neon-red)]/30 cursor-pointer'
                                }
                            `}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded ${isDisabled ? 'bg-white/5' : 'bg-[var(--color-neon-red)]/30'}`}>
                                    <Icon className={`w-4 h-4 ${isDisabled ? 'text-gray-600' : 'text-[var(--color-neon-red)]'}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`font-bold text-sm ${isDisabled ? 'text-gray-600' : 'text-white'}`}>
                                            {power.type.replace(/_/g, ' ')}
                                        </span>
                                        <span className={`text-xs font-mono ${isDisabled ? 'text-gray-700' : 'text-gray-400'}`}>
                                            {power.usesRemaining}/{power.maxUses}
                                        </span>
                                    </div>
                                    <p className={`text-xs ${isDisabled ? 'text-gray-700' : 'text-gray-400'}`}>
                                        {getDescription(power.type)}
                                    </p>
                                    {power.cooldown > 0 && (
                                        <div className="mt-2">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3 h-3 text-gray-600" />
                                                <span className="text-xs text-gray-600 font-mono">
                                                    Cooldown: {power.cooldown}s
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 leading-relaxed">
                    <span className="text-[var(--color-neon-red)] font-bold">⚠ Remember:</span> Use sabotage wisely.
                    Each power has limited uses and cooldown periods.
                </p>
            </div>
        </div>
    );
}
