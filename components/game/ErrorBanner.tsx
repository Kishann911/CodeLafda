"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ErrorBannerProps {
    message: string;
    onDismiss?: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
            >
                <div className="bg-[var(--color-neon-red)]/10 backdrop-blur-xl border-2 border-[var(--color-neon-red)] rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[var(--color-neon-red)] flex-shrink-0 mt-0.5" />

                    <div className="flex-1">
                        <h3 className="font-bold text-[var(--color-neon-red)] uppercase tracking-wider text-sm mb-1">
                            Error
                        </h3>
                        <p className="text-white text-sm">
                            {message}
                        </p>
                    </div>

                    {onDismiss && (
                        <button
                            onClick={onDismiss}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
