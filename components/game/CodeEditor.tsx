"use client";

import Editor, { Monaco } from "@monaco-editor/react";
import { useRef } from "react";

interface CodeEditorProps {
    code: string;
    onChange: (value: string) => void;
    language?: string;
    readOnly?: boolean;
}

export default function CodeEditor({ code, onChange, language = "python", readOnly = false }: CodeEditorProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editorRef = useRef<any>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;

        // Define Custom Theme
        monaco.editor.defineTheme('codelafda-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'FF003C' }, // Neon Red
                { token: 'string', foreground: '00FF41' }, // Neon Green
                { token: 'number', foreground: 'BD00FF' }, // Neon Purple
                { token: 'identifier', foreground: '00F3FF' }, // Neon Blue
            ],
            colors: {
                'editor.background': '#050505',
                'editor.foreground': '#E0E0E0',
                'editor.lineHighlightBackground': '#111111',
                'editor.selectionBackground': '#00FF4133',
                'editorCursor.foreground': '#00FF41',
            }
        });

        monaco.editor.setTheme('codelafda-dark');
    };

    return (
        <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black">
            <div className="flex items-center justify-between px-4 py-2 bg-[#111] border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">main.py</span>
            </div>
            <Editor
                height="100%"
                defaultLanguage={language}
                value={code}
                onChange={(value) => onChange(value || "")}
                onMount={handleEditorDidMount}
                options={{
                    readOnly,
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "JetBrains Mono, monospace",
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    cursorBlinking: "phase",
                    cursorSmoothCaretAnimation: "on",
                    padding: { top: 16 },
                }}
            />
        </div>
    );
}
