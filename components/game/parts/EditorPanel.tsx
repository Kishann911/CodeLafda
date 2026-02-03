"use client";

import { Play, FileCode } from 'lucide-react';
import CodeEditor from "../CodeEditor";
import { SabotagePanel } from "../SabotagePanel";
import { Player, SabotageType } from "@/party/schema";
import { TooltipRoot, TooltipTrigger, TooltipContent, TooltipPortal } from "@/components/onboarding/Tooltip";

interface EditorPanelProps {
    code: string;
    role?: 'HACKER' | 'IMPOSTOR';
    isPyodideLoading: boolean;
    player?: Player;
    onCodeChange: (code: string) => void;
    onRunCode: () => void;
    onSabotage: (type: SabotageType) => void;
}

export const EditorPanel = ({ code, role, isPyodideLoading, player, onCodeChange, onRunCode, onSabotage }: EditorPanelProps) => {
    return (
        <div className="h-full flex flex-col bg-[var(--color-surface)] border-r border-white/10 relative overflow-hidden group">
            {/* Header */}
            <div className="h-10 flex items-center justify-between px-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <FileCode className="w-3 h-3 text-[var(--color-neon-blue)]" />
                    main.py
                </div>
                <div className="text-[10px] text-gray-600 font-mono">
                    AUTOSAVE: ON
                </div>
            </div>

            {/* Editor Wrapper */}
            <div className="flex-1 relative">
                <CodeEditor
                    code={code}
                    onChange={onCodeChange}
                    language="python"
                />
            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-between gap-4">
                <TooltipRoot>
                    <TooltipTrigger asChild>
                        <button
                            onClick={onRunCode}
                            disabled={isPyodideLoading}
                            className="flex-1 py-2.5 bg-[var(--color-neon-green)] text-black font-bold uppercase text-xs tracking-widest hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                        >
                            {isPyodideLoading ? 'EXECUTING...' : <><Play className="w-3 h-3 fill-current" /> Run Code</>}
                        </button>
                    </TooltipTrigger>
                    <TooltipPortal>
                        <TooltipContent side="top">
                            Compiles and executes Python in-browser. Checks for bugs.
                        </TooltipContent>
                    </TooltipPortal>
                </TooltipRoot>
            </div>

            {/* Sabotage Powers for Imposters */}
            {role === 'IMPOSTOR' && player?.sabotagePowers && (
                <div className="p-4 border-t border-white/10">
                    <SabotagePanel
                        powers={player.sabotagePowers}
                        onSabotage={onSabotage}
                    />
                </div>
            )}

            {/* Ambient Corner Accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[var(--color-neon-blue)]/20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[var(--color-neon-blue)]/20 pointer-events-none" />
        </div>
    );
};
