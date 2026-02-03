"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Code2 } from 'lucide-react';
import { LeaderboardFilter, LeaderboardType, TechStack, LeaderboardEntry } from "@/party/schema";
import { LeaderboardService } from '@/lib/progression/LeaderboardService';

export default function LeaderboardPage() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [filter, setFilter] = useState<LeaderboardFilter>('All-Time');
    const [type, setType] = useState<LeaderboardType>('Global');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            // Simulate network delay for realism
            await new Promise(r => setTimeout(r, 600));

            const service = LeaderboardService.getInstance();
            const data = await service.getLeaderboard(type, filter);
            setEntries(data);
            setLoading(false);
        };
        loadData();
    }, [type, filter]);

    return (
        <main className="min-h-screen bg-[var(--color-background)] text-white p-8 pb-32 overflow-y-auto">
            {/* Background */}
            <div className="fixed inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mb-2">
                            ELITE RANKINGS
                        </h1>
                        <p className="text-gray-400 font-mono">
                            The most legendary hackers in the network.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                        {(['All-Time', 'Monthly', 'Weekly'] as LeaderboardFilter[]).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded text-sm font-bold transition-all ${filter === f
                                    ? 'bg-[var(--color-neon-blue)] text-black'
                                    : 'text-gray-400 hover:text-white'
                                    } `}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar: Type Selector */}
                    <div className="space-y-6">
                        {/* Regions */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <h3 className="text-sm font-mono text-gray-500 uppercase mb-3 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Regions
                            </h3>
                            <div className="space-y-1">
                                {(['Global', 'India', 'USA', 'EU', 'SEA'] as LeaderboardType[]).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setType(t)}
                                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${type === t
                                            ? 'bg-white/10 text-white font-bold border-l-2 border-[var(--color-neon-green)]'
                                            : 'text-gray-400 hover:bg-white/5'
                                            } `}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Stacks */}
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <h3 className="text-sm font-mono text-gray-500 uppercase mb-3 flex items-center gap-2">
                                <Code2 className="w-4 h-4" /> Tech Stacks
                            </h3>
                            <div className="space-y-1">
                                {(['Python', 'JavaScript', 'React', 'Rust', 'Web3'] as TechStack[]).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setType(t)}
                                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${type === t
                                            ? 'bg-white/10 text-white font-bold border-l-2 border-[var(--color-neon-blue)]'
                                            : 'text-gray-400 hover:bg-white/5'
                                            } `}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="h-96 flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-[var(--color-neon-blue)] border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <>
                                {/* Podium */}
                                <div className="flex justify-center items-end gap-4 mb-12 h-64">
                                    {entries[1] && <TopPodium entry={entries[1]} place={2} />}
                                    {entries[0] && <TopPodium entry={entries[0]} place={1} />}
                                    {entries[2] && <TopPodium entry={entries[2]} place={3} />}
                                </div>

                                {/* List */}
                                <div className="space-y-2">
                                    {entries.slice(3).map((entry, index) => (
                                        <motion.div
                                            key={entry.playerId}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-lg hover:border-white/20 transition-all hover:translate-x-1"
                                        >
                                            <div className="w-8 font-mono text-gray-500 font-bold">#{entry.rank}</div>
                                            <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center font-bold text-sm">
                                                {entry.username.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="flex-1 font-bold">{entry.username}</div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[var(--color-neon-green)] font-mono font-bold">{entry.value} XP</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

const TopPodium = ({ entry, place }: { entry: LeaderboardEntry; place: number }) => {
    const height = place === 1 ? 'h-48' : place === 2 ? 'h-40' : 'h-32';
    const color = place === 1 ? 'text-yellow-400' : place === 2 ? 'text-gray-300' : 'text-amber-600';
    const bg = place === 1 ? 'bg-yellow-400/20' : place === 2 ? 'bg-white/10' : 'bg-amber-600/20';
    const border = place === 1 ? 'border-yellow-400/50' : place === 2 ? 'border-white/20' : 'border-amber-600/50';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (place * 0.1) }}
            className="flex flex-col items-center justify-end"
        >
            <div className="mb-4 text-center">
                <div className={`w-16 h-16 rounded-full border-2 ${border} flex items-center justify-center text-xl font-bold bg-black mx-auto mb-2`}>
                    {entry.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="font-bold text-white truncate max-w-[120px]">{entry.username}</div>
                <div className={`font-mono text-sm ${color} `}>{entry.value} XP</div>
            </div>
            <div className={`w-24 md:w-32 ${height} ${bg} border-t-4 ${border} rounded-t-lg flex items-center justify-center relative`}>
                <div className={`text-4xl font-black ${color} opacity-50`}>{place}</div>
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-t from-transparent to-white/5`} />
            </div>
        </motion.div>
    );
};
