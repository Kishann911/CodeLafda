"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Plus, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PlayerPreferences } from "@/party/schema";

export default function LobbyEntryPage() {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
    const [preferences, setPreferences] = useState<PlayerPreferences | null>(null);

    // Check for preferences on mount
    useEffect(() => {
        const stored = localStorage.getItem('codelafda_preferences');
        if (!stored) {
            // Redirect to preferences page
            router.push('/preferences');
        } else {
            // Delay to avoid synchronous render warning
            setTimeout(() => setPreferences(JSON.parse(stored)), 0);
        }
    }, [router]);

    const handleCreate = () => {
        // Generate random 6-char ID
        const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        if (!username) return alert("Please enter a username"); // Simple validation

        // Pass username via query param for simplicity in this MVP
        router.push(`/room/${newRoomId}?username=${encodeURIComponent(username)}`);
    };

    const handleJoin = () => {
        if (!roomId) return alert("Enter a Room ID");
        if (!username) return alert("Please enter a username");
        router.push(`/room/${roomId.toUpperCase()}?username=${encodeURIComponent(username)}`);
    };

    // Show loading while checking preferences
    if (preferences === null) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-[var(--color-neon-green)] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-neon-blue)]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-neon-purple)]/5 rounded-full blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-2 tracking-tighter">AUTHENTICATE</h1>
                    <p className="text-gray-500 font-mono text-sm">Join the network to execute instructions.</p>
                </div>

                <div className="space-y-6 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl">

                    <div>
                        <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Identify Yourself</label>
                        <input
                            type="text"
                            placeholder="CODENAME"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-700 outline-none focus:border-[var(--color-neon-green)] transition-all font-mono"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleCreate}
                            className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-[var(--color-neon-green)]/10 border border-[var(--color-neon-green)]/30 hover:bg-[var(--color-neon-green)]/20 hover:scale-[1.02] transition-all group"
                        >
                            <Plus className="w-8 h-8 text-[var(--color-neon-green)] mb-1 group-hover:rotate-90 transition-transform" />
                            <span className="text-[var(--color-neon-green)] font-bold text-sm uppercase">Create Node</span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={handleJoin}
                                className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group"
                            >
                                <LogIn className="w-8 h-8 text-white mb-1 group-hover:translate-x-1 transition-transform" />
                                <span className="text-white font-bold text-sm uppercase">Join Node</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="ENTER ROOM ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-center text-white placeholder-gray-700 outline-none focus:border-[var(--color-neon-blue)] transition-all font-mono tracking-widest uppercase text-lg"
                        />
                    </div>

                </div>

                {/* Preferences Display */}
                {preferences && (
                    <div className="mt-6 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Your Preferences</span>
                            <Link href="/preferences" className="text-xs text-[var(--color-neon-blue)] hover:underline">
                                Edit
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {preferences.techStacks.slice(0, 5).map(stack => (
                                <span
                                    key={stack}
                                    className="px-2 py-1 bg-[var(--color-neon-green)]/10 border border-[var(--color-neon-green)]/30 rounded text-xs text-[var(--color-neon-green)] font-mono"
                                >
                                    {stack}
                                </span>
                            ))}
                            {preferences.techStacks.length > 5 && (
                                <span className="px-2 py-1 text-xs text-gray-500">
                                    +{preferences.techStacks.length - 5} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link href="/" className="text-gray-600 hover:text-gray-400 flex items-center justify-center gap-2 transition-colors text-xs font-mono uppercase">
                        <ArrowLeft className="w-3 h-3" /> Abort Sequence
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
