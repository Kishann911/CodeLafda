"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { cn } from "@/lib/utils";
import React from "react";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'neon';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ElementType;
}

export const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    icon: Icon,
    children,
    onClick,
    onMouseEnter,
    disabled,
    ...props
}, ref) => {
    const { playSound } = useSound();

    const variants = {
        primary: "bg-white text-black border-white hover:bg-gray-200",
        secondary: "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40",
        danger: "bg-red-500/20 text-red-500 border-red-500/50 hover:bg-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
        ghost: "bg-transparent text-gray-400 hover:text-white border-transparent",
        neon: "bg-[var(--color-neon-blue)] text-black border-[var(--color-neon-blue)] hover:shadow-[0_0_20px_var(--color-neon-blue)]"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base"
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !isLoading) {
            playSound('hover');
        }
        onMouseEnter?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !isLoading) {
            playSound('click');
        }
        onClick?.(e);
    };

    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={cn(
                "relative font-bold uppercase tracking-widest border transition-colors flex items-center justify-center gap-2 overflow-hidden group",
                variants[variant],
                sizes[size],
                disabled && "opacity-50 cursor-not-allowed grayscale",
                className
            )}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Scanline / Glitch effect on hover */}
            {!disabled && variant !== 'ghost' && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}

            {isLoading && (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            )}

            {!isLoading && Icon && <Icon className="w-4 h-4" />}

            <span className="relative z-10">{children as React.ReactNode}</span>
        </motion.button>
    );
});

CyberButton.displayName = "CyberButton";
