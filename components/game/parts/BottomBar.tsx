import { Terminal, Info, Wifi } from "lucide-react";

export const BottomBar = () => {
    return (
        <footer className="h-8 border-t border-white/10 bg-black flex items-center justify-between px-4 text-[10px] text-gray-500 font-mono uppercase tracking-wider shrink-0 z-20 relative">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-help">
                    <Terminal className="w-3 h-3" />
                    System Logs Active
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-help">
                    <Info className="w-3 h-3" />
                    v.2.0.4-beta
                </span>
            </div>

            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[var(--color-neon-green)]">
                    <Wifi className="w-3 h-3" />
                    PartyKit: Online
                </span>
            </div>
        </footer>
    );
};
