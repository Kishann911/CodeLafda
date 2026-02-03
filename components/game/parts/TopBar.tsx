"use client";

import { Copy, Check, Clock, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GameState } from "@/party/schema";

interface TopBarProps {
    roomId: string;
    gameState: GameState | null;
}

export const TopBar = ({ roomId, gameState }: TopBarProps) => {
    const [copied, setCopied] = useState(false);

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const phase = gameState?.phase || 'CONNECTING';

    return (
        <header className="h-14 border-b border-white/10 bg-black/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-20 relative">
            {/* Left: Branding & Room Info */}
            <div className="flex items-center gap-6">
                <div className="text-xl font-bold tracking-widest text-[var(--color-neon-blue)] font-mono">
                    CODELAFDA <span className="text-xs text-gray-500 align-top">v2.0</span>
                </div>

                <div
                    onClick={copyRoomId}
                    className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded cursor-pointer transition-colors group"
                >
                    <span className="text-xs text-gray-400 uppercase tracking-wider group-hover:text-white">Room ID:</span>
                    <code className="text-sm font-bold text-[var(--color-neon-green)] font-mono">{roomId}</code>
                    {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-500 group-hover:text-white" />}
                </div>
            </div>

            {/* Center: Phase Indicator */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
                    <span className={`w-2 h-2 rounded-full ${phase === 'SABOTAGE' ? 'bg-[var(--color-neon-red)] animate-ping' : 'bg-[var(--color-neon-green)]'}`} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-200">
                        STATUS: <span className={phase === 'SABOTAGE' ? 'text-[var(--color-neon-red)]' : 'text-white'}>{phase}</span>
                    </span>
                </div>
            </div>

            {/* Right: Timer & Ping */}
            <div className="flex items-center gap-4">
                {gameState?.phase === 'CODING' && (
                    <div className="flex items-center gap-2 text-[var(--color-neon-red)] animate-pulse">
                        <Clock className="w-4 h-4" />
                        <span className="text-lg font-bold font-mono">{gameState.timer}s</span>
                    </div>
                )}
                <Link href="/leaderboard" target="_blank" className="p-2 hover:bg-white/10 rounded-full transition-colors text-[var(--color-neon-gold)]" title="Leaderboard">
                    <Trophy className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-1 text-[10px] text-gray-600 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    CONNECTED
                </div>
            </div>
        </header>
    );
};
