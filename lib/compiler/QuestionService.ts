import { questionPool, selectQuestion } from "@/party/questions";
import { GameQuestion, TechStack } from "@/party/schema";

export class QuestionService {
    private static instance: QuestionService;

    private constructor() { }

    public static getInstance(): QuestionService {
        if (!QuestionService.instance) {
            QuestionService.instance = new QuestionService();
        }
        return QuestionService.instance;
    }

    public getQuestionForStack(stack: TechStack): GameQuestion | null {
        // Simple wrapper for now, can be expanded with difficulty logic later
        const stackQuestions = questionPool[stack];
        if (!stackQuestions || stackQuestions.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * stackQuestions.length);
        return stackQuestions[randomIndex];
    }

    public getQuestionForStacks(stacks: TechStack[]): GameQuestion | null {
        return selectQuestion(stacks);
    }

    public getAvailableStacks(): TechStack[] {
        return Object.keys(questionPool) as TechStack[];
    }
}
