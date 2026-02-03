import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface TechStackCardProps {
    name: string;
    category: string;
    description: string;
    icon: LucideIcon;
    isSelected: boolean;
    onToggle: () => void;
}

export function TechStackCard({
    name,
    category,
    description,
    icon: Icon,
    isSelected,
    onToggle
}: TechStackCardProps) {
    return (
        <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
                relative p-6 rounded-xl backdrop-blur-md transition-all duration-300
                ${isSelected
                    ? 'bg-white/10 border-2 border-[var(--color-neon-green)] shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                }
            `}
        >
            {/* Glow Effect for Selected */}
            {isSelected && (
                <div className="absolute inset-0 bg-[var(--color-neon-green)]/5 rounded-xl blur-xl pointer-events-none" />
            )}

            {/* Icon */}
            <div className={`relative mb-4 p-3 rounded-lg w-fit ${isSelected ? 'bg-[var(--color-neon-green)]/20' : 'bg-white/5'}`}>
                <Icon className={`w-8 h-8 ${isSelected ? 'text-[var(--color-neon-green)]' : 'text-gray-400'}`} />
            </div>

            {/* Category Badge */}
            <div className="mb-2">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    {category}
                </span>
            </div>

            {/* Name */}
            <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                {name}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-500 leading-relaxed">
                {description}
            </p>

            {/* Check Indicator */}
            {isSelected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-[var(--color-neon-green)] rounded-full flex items-center justify-center"
                >
                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                </motion.div>
            )}
        </motion.button>
    );
}
