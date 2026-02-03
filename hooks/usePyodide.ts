"use client";

import { useEffect, useState } from "react";

declare global {
    interface Window {
        loadPyodide: () => Promise<PyodideInterface>;
    }
}

interface PyodideInterface {
    setStdout: (options: { batched: (msg: string) => void }) => void;
    runPythonAsync: (code: string) => Promise<unknown>;
}

export default function usePyodide() {
    const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [output, setOutput] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function initPyodide() {
            if (window.loadPyodide && !pyodide) {
                const py = await window.loadPyodide();
                if (mounted) {
                    setPyodide(py as PyodideInterface);
                    setIsLoading(false);
                }
                return;
            }

            // Load script if not present
            if (!document.getElementById("pyodide-script")) {
                const script = document.createElement("script");
                script.id = "pyodide-script";
                script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
                script.onload = async () => {
                    const py = await window.loadPyodide();
                    if (mounted) {
                        setPyodide(py as PyodideInterface);
                        setIsLoading(false);
                    }
                };
                document.body.appendChild(script);
            }
        }

        initPyodide();

        return () => {
            mounted = false;
        };
    }, [pyodide]);

    const runCode = async (code: string) => {
        if (!pyodide) return;

        setOutput([]);
        setError(null);

        try {
            // Redirect stdout
            pyodide.setStdout({ batched: (msg: string) => setOutput((prev) => [...prev, msg]) });

            await pyodide.runPythonAsync(code);

            // Check result (simple check for now)
            // In a real game we would run unit tests here

        } catch (err) {
            setError(String(err));
        }
    };

    return { pyodide, isLoading, output, error, runCode };
}
