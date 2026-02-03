

export type CompilerType = 'PYODIDE' | 'WEB_WORKER' | 'NATIVE_EVAL' | 'WASM' | 'MOCK_DB';

export interface CompilationResult {
    success: boolean;
    output: string;
    error?: string;
    executionTimeMs?: number;
}

export interface CompilerStrategy {
    id: CompilerType;
    initialize(): Promise<void>;
    execute(code: string, context?: Record<string, unknown>): Promise<CompilationResult>;
    cleanup?(): void;
}

export interface TestCase {
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
}
