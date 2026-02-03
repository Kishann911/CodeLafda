import { motion } from "framer-motion";
import { Crown, UserX } from "lucide-react";
import { Player } from "@/party/schema";

interface PlayerListPanelProps {
    players: Player[];
    hostId: string;
    currentUserId: string;
    onKickPlayer?: (playerId: string) => void;
}

export function PlayerListPanel({ players, hostId, currentUserId, onKickPlayer }: PlayerListPanelProps) {
    const isHost = currentUserId === hostId;

    return (
        <div id="player-list-panel" className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10">
                <h2 className="font-bold text-lg mb-1">Squad</h2>
                <p className="text-xs text-gray-500 font-mono">
                    {players.filter(p => p.isReady).length}/{players.length} ready
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {players.map((player, index) => (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`
                            relative p-4 rounded-lg border backdrop-blur-sm transition-all
                            ${player.isReady
                                ? 'bg-[var(--color-neon-green)]/10 border-[var(--color-neon-green)]/30 border-l-4'
                                : 'bg-white/5 border-white/10'
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
                                style={{
                                    backgroundColor: player.color || 'rgba(255,255,255,0.1)',
                                    border: `2px solid ${player.color || 'rgba(255,255,255,0.2)'}`
                                }}
                            >
                                {player.username.substring(0, 2).toUpperCase()}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold truncate">{player.username}</span>
                                    {player.id === hostId && (
                                        <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                    )}
                                    {player.id === currentUserId && (
                                        <span className="text-xs px-2 py-0.5 bg-[var(--color-neon-blue)]/20 text-[var(--color-neon-blue)] rounded-full font-mono">
                                            YOU
                                        </span>
                                    )}
                                </div>

                                {/* Preferences Badges */}
                                {player.preferences?.techStacks && (
                                    <div className="flex flex-wrap gap-1">
                                        {player.preferences.techStacks.slice(0, 3).map(stack => (
                                            <span
                                                key={stack}
                                                className="text-[10px] px-1.5 py-0.5 bg-black/40 border border-white/10 rounded font-mono text-gray-400"
                                            >
                                                {stack}
                                            </span>
                                        ))}
                                        {player.preferences.techStacks.length > 3 && (
                                            <span className="text-[10px] px-1.5 py-0.5 text-gray-600">
                                                +{player.preferences.techStacks.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Ready Indicator */}
                            <div className="flex items-center gap-2">
                                {player.isReady && (
                                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-neon-green)]">
                                        Ready
                                    </span>
                                )}

                                {/* Kick Button (Host Only) */}
                                {isHost && player.id !== currentUserId && onKickPlayer && (
                                    <button
                                        onClick={() => onKickPlayer(player.id)}
                                        className="p-1 hover:bg-red-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                                        title="Kick player"
                                    >
                                        <UserX className="w-4 h-4 text-red-500" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
