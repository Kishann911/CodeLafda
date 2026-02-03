"use client";

import { Users, AlertTriangle, UserCheck } from "lucide-react";
import { Player } from "@/party/schema";

interface SocialPanelProps {
    players: Player[];
    currentUserId: string;
    hostId: string | null;
    onVote: (targetId: string) => void;
    phase: string;
}

export const SocialPanel = ({ players, currentUserId, hostId }: SocialPanelProps) => {
    return (
        <div className="h-full flex flex-col bg-[var(--color-surface)] relative">
            {/* Header */}
            <div className="h-10 flex items-center gap-2 px-4 border-b border-white/5 bg-white/[0.02] text-xs font-bold text-gray-400 uppercase tracking-widest">
                <Users className="w-3 h-3 text-[var(--color-neon-green)]" />
                Squad Roster
            </div>

            {/* Player List */}
            <div className="flex-1 p-2 overflow-y-auto space-y-1">
                {players.map((p) => (
                    <div
                        key={p.id}
                        className={`group flex items-center justify-between p-2 rounded border transition-all ${p.isAlive
                            ? 'bg-white/5 border-white/5 hover:bg-white/10'
                            : 'bg-red-900/10 border-red-500/20 grayscale opacity-70'
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-gray-700 to-black border border-white/10 flex items-center justify-center text-xs font-bold font-mono">
                                    {p.username.substring(0, 2).toUpperCase()}
                                </div>
                                {p.id === hostId && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-[var(--color-surface)]" title="Host" />
                                )}
                                {!p.isAlive && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded">
                                        <div className="w-6 h-0.5 bg-red-600 rotate-45 absolute" />
                                        <div className="w-6 h-0.5 bg-red-600 -rotate-45 absolute" />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-sm font-bold leading-none ${p.id === currentUserId ? 'text-[var(--color-neon-blue)]' : 'text-gray-300'}`}>
                                    {p.username} {p.id === currentUserId && '(YOU)'}
                                </span>
                                <span className="text-[10px] text-gray-600 mt-1 flex items-center gap-1 font-mono uppercase">
                                    {p.isAlive ? <><UserCheck className="w-2.5 h-2.5 text-green-500" /> Active</> : <><AlertTriangle className="w-2.5 h-2.5 text-red-500" /> Ejected</>}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Placeholder (Visual only for now) */}
            <div className="h-40 border-t border-white/10 bg-black/20 p-2 flex flex-col">
                <div className="flex-1 flex items-center justify-center text-[10px] text-gray-600 uppercase tracking-widest italic">
                    Encrypted Channel Established
                </div>
                <input
                    type="text"
                    placeholder="TYPE MESSAGE..."
                    disabled
                    className="w-full bg-black border border-white/10 rounded px-3 py-2 text-xs font-mono text-gray-400 focus:outline-none focus:border-[var(--color-neon-blue)] disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
};
