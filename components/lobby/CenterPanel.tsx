import { motion } from "framer-motion";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface CenterPanelProps {
    roomId: string;
    playerCount: number;
    status: string;
}

export function CenterPanel({ roomId, playerCount, status }: CenterPanelProps) {
    const [copied, setCopied] = useState(false);
    const joinUrl = typeof window !== 'undefined' ? `${window.location.origin}/room/${roomId}` : '';

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyInviteLink = () => {
        navigator.clipboard.writeText(joinUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div id="lobby-center" className="flex flex-col items-center justify-center h-full space-y-8 p-8">
            {/* Room ID Display */}
            <div className="text-center">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 block">
                    Room ID
                </span>
                <motion.div
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="absolute inset-0 bg-[var(--color-neon-green)]/20 blur-2xl rounded-lg" />
                    <div className="relative px-8 py-6 bg-black/60 backdrop-blur-sm border-2 border-[var(--color-neon-green)] rounded-lg">
                        <span className="text-5xl font-black font-mono tracking-[0.2em] text-[var(--color-neon-green)]">
                            {roomId}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Copy Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={copyRoomId}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-neon-green)] rounded-lg transition-all group"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-[var(--color-neon-green)]" />
                            <span className="text-sm font-mono text-[var(--color-neon-green)]">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-neon-green)] transition-colors" />
                            <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors">
                                Copy Code
                            </span>
                        </>
                    )}
                </button>

                <button
                    onClick={copyInviteLink}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-neon-blue)] rounded-lg transition-all group"
                >
                    <LinkIcon className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-neon-blue)] transition-colors" />
                    <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors">
                        Copy Invite Link
                    </span>
                </button>
            </div>

            {/* Status */}
            <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-white">
                    {playerCount} Player{playerCount !== 1 ? 's' : ''} Connected
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-[var(--color-neon-green)] rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
}
