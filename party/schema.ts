export type GamePhase =
    | 'LOBBY'
    | 'PREPARE'          // Pre-flight validation
    | 'LOAD_COMPILERS'   // Async compiler loading
    | 'LOAD_QUESTIONS'   // Question pool validation
    | 'ASSIGN_IMPOSTER'  // Role assignment
    | 'START_ROUND'      // Final transition
    | 'CODING'
    | 'SABOTAGE'
    | 'DISCUSSION'
    | 'VOTING'
    | 'RESULTS';

export interface LoadingProgress {
    phase: GamePhase;
    message: string;
    progress: number; // 0-100
    error?: string;
}

export interface GameQuestion {
    id: string;
    title: string;
    description: string;
    starterCode: string;
    testCases: Array<{
        input: string;
        expectedOutput: string;
        isHidden?: boolean;
    }>;
    difficulty: 'easy' | 'medium' | 'hard';
    techStack: TechStack;
    compilerType?: 'PYODIDE' | 'WEB_WORKER' | 'NATIVE_EVAL' | 'WASM' | 'MOCK_DB'; // Hint for client
    validationScript?: string; // For framework validation
}

export type PlayerRole = 'HACKER' | 'IMPOSTOR'; // Hacker = Good, Impostor = Bad

// Tech Stack Personalization Types
export type TechStack =
    | 'React' | 'Vue' | 'Angular' | 'Next.js' | 'Svelte'
    | 'Node.js' | 'Django' | 'Flask' | 'Spring Boot' | 'Ruby on Rails'
    | 'MongoDB' | 'PostgreSQL' | 'MySQL' | 'Redis'
    | 'Solidity' | 'Smart Contract Security' | 'Gas Optimization' | 'Wallet Integration'
    | 'JavaScript' | 'TypeScript' | 'Python' | 'Java' | 'C++' | 'Rust' | 'Go';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type GameMode = 'Single Stack' | 'Multi-Stack' | 'Dynamic';

export interface PlayerPreferences {
    techStacks: TechStack[];
    skillLevel: SkillLevel;
    gameMode: GameMode;
}

// Imposter Sabotage Power Types
export type SabotageType =
    | 'INJECT_BUG'           // Inject syntax/logic errors
    | 'ALTER_OUTPUT'         // Change test results
    | 'DELAY_COMPILE'        // Add artificial delay
    | 'CONFUSE_TEAMMATES';   // Scramble chat messages (future)

export interface SabotagePower {
    type: SabotageType;
    cooldown: number;        // Seconds until next use
    maxUses: number;         // Per match
    usesRemaining: number;
}

export interface Player {
    id: string;
    username: string;
    tileId?: string; // For avatar/cursor tracking
    role?: PlayerRole;
    isReady: boolean;
    isAlive: boolean;
    color?: string;
    preferences?: PlayerPreferences;
    sabotagePowers?: SabotagePower[]; // For imposters only
}

export interface GameState {
    phase: GamePhase;
    players: Record<string, Player>;
    hostId: string;
    timer: number;
    code: string; // Shared code content
    output: string; // Console output
    missionProgress: number; // 0-100%
    currentTask?: string; // Description of the coding task
    sabotages: SabotageEvent[];
    selectedStacks: TechStack[]; // Tech stacks for current match
    loadingProgress?: LoadingProgress;  // Loading state tracking
    currentQuestion?: GameQuestion;      // Active question
    errorMessage?: string;               // Error feedback
    votes?: Record<string, string>;      // Map of voterId -> targetId
    winner?: 'HACKERS' | 'IMPOSTORS';    // Game result
}

export interface SabotageEvent {
    id: string;
    type: 'SYNTAX_ERROR' | 'HIDDEN_BUG' | 'TIME_REDUCTION';
    active: boolean;
    targetPlayerId?: string;
}

// Messages client sends to server
export type ClientMessage =
    | { type: 'join'; username: string; preferences?: PlayerPreferences }
    | { type: 'ready' }
    | { type: 'start-game' }
    | { type: 'code-change'; code: string }
    | { type: 'sabotage'; sabotageType: SabotageType; targetId?: string }
    | { type: 'vote'; targetId: string }
    | { type: 'kick-player'; playerId: string }
    | { type: 'end-game' };

// Messages server sends to client
export type ServerMessage =
    | { type: 'state-update'; gameState: GameState }
    | { type: 'chat'; senderId: string; text: string }
    | { type: 'code-sync'; code: string };

// --- PROGRESSION & RANKING TYPES ---

export type Region = 'Global' | 'India' | 'USA' | 'EU' | 'SEA' | 'LATAM' | 'Africa';

export type PlayerRank =
    | 'Script Kiddie'
    | 'Junior Dev'
    | 'Senior Dev'
    | 'Tech Lead'
    | 'Architect'
    | '10x Engineer'
    | 'AI Overlord';

export interface PlayerStats {
    totalMatches: number;
    wins: number;
    impostorWins: number;
    hackerWins: number;
    accuracy: number; // Avg % passing tests
    avgSpeed: number; // Avg completion time in seconds
    deceptionScore: number; // 0-100 Rating
    collaborationScore: number; // 0-100 Rating
    xp: number;
    rank: PlayerRank;
    badges: string[]; // IDs of unlocked badges
    region: Region;
}

export interface LeaderboardEntry {
    playerId: string;
    username: string;
    avatar?: string;
    value: number; // Score/Metric
    rank: number;
    change: number; // Trend: +1, -2, 0
    region: Region;
    mainStack?: TechStack;
}

export type LeaderboardFilter = 'All-Time' | 'Monthly' | 'Weekly';
export type LeaderboardType = 'Global' | Region | TechStack;

