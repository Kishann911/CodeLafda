"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { Github, Twitter, Linkedin } from "lucide-react";
import AnimatedHero from "@/components/landing/AnimatedHero";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import StatsSection from "@/components/landing/StatsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import ParticleField from "@/components/landing/ParticleField";
import PageLoader from "@/components/landing/PageLoader";

export default function Home() {
    return (
        <>
            <PageLoader />
            <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
                <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] overflow-hidden selection:bg-[var(--color-neon-green)] selection:text-black relative">

                    {/* Background Particle Field */}
                    <div className="fixed inset-0 z-0">
                        <ParticleField />
                    </div>

                    {/* Content Sections */}
                    <div className="relative z-10">
                        {/* Hero Section */}
                        <AnimatedHero />

                        {/* Features Section */}
                        <FeaturesSection />

                        {/* How It Works Section */}
                        <HowItWorks />

                        {/* Stats Section */}
                        <StatsSection />

                        {/* Testimonials Section */}
                        <TestimonialsSection />

                        {/* CTA Section */}
                        <CTASection />
                    </div>

                    {/* Footer */}
                    <footer className="relative z-20 border-t border-white/10 bg-[var(--color-background)]/80 backdrop-blur-md">
                        <div className="max-w-7xl mx-auto px-6 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                                {/* Brand */}
                                <div className="col-span-1 md:col-span-2">
                                    <h3 className="text-2xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-blue)]">
                                        CODELAFDA
                                    </h3>
                                    <p className="text-gray-400 mb-4 max-w-md">
                                        The ultimate social deduction coding game. Code, betray, debug. Trust no one.
                                    </p>
                                    <div className="flex gap-4">
                                        <a href="#" className="text-gray-400 hover:text-[var(--color-neon-green)] transition-colors duration-300">
                                            <Github className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors duration-300">
                                            <Twitter className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-[var(--color-neon-purple)] transition-colors duration-300">
                                            <Linkedin className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-[var(--color-neon-blue)]">
                                        Game
                                    </h4>
                                    <ul className="space-y-2">
                                        <li><a href="/lobby" className="text-gray-400 hover:text-white transition-colors duration-300">Play Now</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">How to Play</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Rules</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Leaderboard</a></li>
                                    </ul>
                                </div>

                                {/* Resources */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-[var(--color-neon-purple)]">
                                        Resources
                                    </h4>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Documentation</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">API</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Community</a></li>
                                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Support</a></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Bottom bar */}
                            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-gray-500 text-sm font-mono">
                                    © 2026 CODELAFDA. All rights reserved.
                                </p>
                                <div className="flex gap-6 text-sm">
                                    <a href="#" className="text-gray-500 hover:text-[var(--color-neon-green)] transition-colors duration-300">Privacy Policy</a>
                                    <a href="#" className="text-gray-500 hover:text-[var(--color-neon-green)] transition-colors duration-300">Terms of Service</a>
                                    <a href="#" className="text-gray-500 hover:text-[var(--color-neon-green)] transition-colors duration-300">Cookie Policy</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </main>
            </ReactLenis>
        </>
    );
}
