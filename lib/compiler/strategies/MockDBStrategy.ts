import { CompilerStrategy, CompilationResult } from "../types";

export class MockDBStrategy implements CompilerStrategy {
    id = "MOCK_DB" as const;
    private initialized = false;

    async initialize(): Promise<void> {
        // Simulate loading a heavy library
        console.log("[MockDBStrategy] Initializing in-memory DB...");
        await new Promise(resolve => setTimeout(resolve, 500));
        this.initialized = true;
    }

    async execute(code: string): Promise<CompilationResult> {
        if (!this.initialized) await this.initialize();

        // Check if code contains basic SQL keywords
        const lowerCode = code.toLowerCase();
        if (!lowerCode.includes('select') || !lowerCode.includes('from')) {
            return {
                success: false,
                output: "",
                error: "Syntax Error: Missing SELECT or FROM clause."
            };
        }

        // Mock execution success
        return {
            success: true,
            output: "Query Executed Successfully\n---------------------------\nid | name     | role\n1  | Alice    | Admin\n2  | Bob      | User",
            executionTimeMs: 45
        };
    }
}
