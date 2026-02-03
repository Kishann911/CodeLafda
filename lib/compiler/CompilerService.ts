import { CompilerStrategy, CompilerType, CompilationResult } from "./types";
import { MockDBStrategy } from "./strategies/MockDBStrategy";
// import { PyodideStrategy } from "./strategies/PyodideStrategy";

export class CompilerService {
    private static instance: CompilerService;
    private strategies: Map<CompilerType, CompilerStrategy> = new Map();

    private constructor() {
        // Initialize default strategies
        this.registerStrategy(new MockDBStrategy());
        // this.registerStrategy(new PyodideStrategy());
    }

    public static getInstance(): CompilerService {
        if (!CompilerService.instance) {
            CompilerService.instance = new CompilerService();
        }
        return CompilerService.instance;
    }

    public registerStrategy(strategy: CompilerStrategy) {
        this.strategies.set(strategy.id, strategy);
    }

    public async run(
        compilerType: CompilerType,
        code: string,
        context?: Record<string, unknown>
    ): Promise<CompilationResult> {
        const strategy = this.strategies.get(compilerType);

        if (!strategy) {
            console.warn(`[CompilerService] No strategy found for ${compilerType}. Falling back to mock.`);
            return {
                success: false,
                output: "",
                error: `Compiler strategy ${compilerType} not yet implemented on client.`
            };
        }

        try {
            await strategy.initialize();
            return await strategy.execute(code, context);
        } catch (err: unknown) {
            console.error(`[CompilerService] Execution failed for ${compilerType}:`, err);
            return {
                success: false,
                output: "",
                error: (err as Error).message || String(err) || "Unknown runtime error"
            };
        }
    }
}
