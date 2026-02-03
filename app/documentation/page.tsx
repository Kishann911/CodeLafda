"use client";

import { ReactLenis } from "lenis/react";
import Link from "next/link";
import { ArrowLeft, Book, Code, Terminal, Server, Shield } from "lucide-react";

export default function DocumentationPage() {
    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
            <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-[var(--color-neon-green)] selection:text-black">
                {/* Header */}
                <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[var(--color-background)]/80 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-mono text-sm uppercase tracking-wider">Back to Base</span>
                        </Link>
                        <h1 className="font-black text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-blue)]">
                            CODELAFDA // DOCS
                        </h1>
                    </div>
                </header>

                <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                    {/* Intro */}
                    <div className="mb-20">
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white">
                            System Documentation
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                            Comprehensive guide to the CodeLafda protocol. Master the game, understand the architecture, and integrate with our API.
                        </p>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[var(--color-neon-green)] transition-colors duration-300">
                            <Book className="w-8 h-8 text-[var(--color-neon-green)] mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-white">Game Rules</h3>
                            <p className="text-gray-400">Learn how to play, win conditions, and role mechanics.</p>
                        </div>
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[var(--color-neon-blue)] transition-colors duration-300">
                            <Server className="w-8 h-8 text-[var(--color-neon-blue)] mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-white">Setup Guide</h3>
                            <p className="text-gray-400">Instructions for hosting your own game server instance.</p>
                        </div>
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[var(--color-neon-purple)] transition-colors duration-300">
                            <Terminal className="w-8 h-8 text-[var(--color-neon-purple)] mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-white">API Reference</h3>
                            <p className="text-gray-400">Endpoints for stats, leaderboards, and game history.</p>
                        </div>
                        <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[var(--color-neon-red)] transition-colors duration-300">
                            <Shield className="w-8 h-8 text-[var(--color-neon-red)] mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-white">Security</h3>
                            <p className="text-gray-400">Anti-cheat measures and secure code execution.</p>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-16">

                        {/* Game Rules */}
                        <section id="rules" className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-[var(--color-neon-green)]">01.</span> Game Rules
                            </h2>
                            <div className="bg-black/40 border border-white/10 rounded-xl p-8">
                                <h3 className="text-xl font-bold text-white mb-4">Objective</h3>
                                <p className="text-gray-300 mb-6">
                                    <strong>Developers</strong> must fix all bugs in the codebase before time runs out.
                                    <strong> Imposters</strong> must sabotage the codebase or eliminate all Developers without being caught.
                                </p>

                                <h3 className="text-xl font-bold text-white mb-4">Phases</h3>
                                <ul className="list-disc pl-6 space-y-2 text-gray-300 marker:text-[var(--color-neon-green)]">
                                    <li><strong>Coding Phase:</strong> Real-time collaborative editing. Developers fix bugs, Imposters introduce them.</li>
                                    <li><strong>Discussion Phase:</strong> Triggered by calling a meeting or reporting a suspicious commit. Players discuss and vote to eject.</li>
                                    <li><strong>Voting Phase:</strong> Majority vote ejects a player. Ties result in no ejection.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Architecture */}
                        <section id="architecture" className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-[var(--color-neon-blue)]">02.</span> Technical Architecture
                            </h2>
                            <div className="bg-black/40 border border-white/10 rounded-xl p-8">
                                <p className="text-gray-300 mb-6">
                                    CodeLafda is built on a modern Next.js stack with real-time capabilities powered by WebSockets.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <Code className="w-6 h-6 text-[var(--color-neon-blue)] mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-white">Frontend</h4>
                                            <p className="text-gray-400 text-sm">Next.js 14, TailwindCSS, Framer Motion, Monaco Editor</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Server className="w-6 h-6 text-[var(--color-neon-blue)] mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-white">Backend</h4>
                                            <p className="text-gray-400 text-sm">Node.js, WebSocket (ws), Docker containers for code execution</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* API */}
                        <section id="api" className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-[var(--color-neon-purple)]">03.</span> API Reference
                            </h2>
                            <div className="bg-black/40 border border-white/10 rounded-xl p-8 overflow-hidden">
                                <p className="text-gray-300 mb-6">
                                    Public endpoints are rate-limited to 100 requests per minute.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-[var(--color-neon-green)]/20 text-[var(--color-neon-green)] px-2 py-1 rounded text-xs font-mono font-bold">GET</span>
                                            <code className="text-white font-mono">/api/v1/leaderboard</code>
                                        </div>
                                        <p className="text-gray-400 text-sm">Returns global leaderboard rankings.</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="bg-[var(--color-neon-blue)]/20 text-[var(--color-neon-blue)] px-2 py-1 rounded text-xs font-mono font-bold">GET</span>
                                            <code className="text-white font-mono">/api/v1/user/:id/stats</code>
                                        </div>
                                        <p className="text-gray-400 text-sm">Returns statistics for a specific user.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Footer */}
                    <div className="mt-20 pt-10 border-t border-white/10 text-center">
                        <p className="text-gray-500 font-mono text-sm">
                            Need help? <a href="#" className="text-[var(--color-neon-green)] hover:underline">Join our Discord</a>
                        </p>
                    </div>
                </div>
            </main>
        </ReactLenis>
    );
}
