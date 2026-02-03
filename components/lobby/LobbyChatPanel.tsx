"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Terminal } from "lucide-react";


interface ChatMessage {
    id: string;
    sender: string;
    text: string;
    timestamp: Date;
    isSystem?: boolean;
}

export function LobbyChatPanel() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', sender: 'System', text: 'Secure connection established.', timestamp: new Date(), isSystem: true },
        { id: '2', sender: 'System', text: 'Waiting for players to initialize...', timestamp: new Date(), isSystem: true }
    ]);
    const [inputValue, setInputValue] = useState("");
    const endRef = useRef<HTMLDivElement>(null);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        // Mock send for now - ideally this connects to websocket
        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'You', // This would come from auth context
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMsg]);
        setInputValue("");
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-[#0a0a0f] border-t border-white/10">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <Terminal className="w-3 h-3 text-[var(--color-neon-blue)]" />
                <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                    Mission Log & Chat
                </span>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm custom-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`${msg.isSystem ? 'text-[var(--color-neon-green)]' : 'text-gray-300'}`}>
                        <span className="opacity-50 text-[10px] mr-2">
                            [{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
                        </span>
                        {!msg.isSystem && <span className="font-bold text-[var(--color-neon-blue)] mr-2">{msg.sender}:</span>}
                        <span className={msg.isSystem ? 'italic' : ''}>{msg.text}</span>
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-2 bg-white/[0.02] flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter command or message..."
                    className="flex-1 bg-transparent border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-neon-blue)] font-mono placeholder:text-gray-700"
                />
                <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="px-3 py-2 bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)] rounded hover:bg-[var(--color-neon-blue)]/20 disabled:opacity-50 transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
