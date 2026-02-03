import {
    LeaderboardEntry,
    LeaderboardFilter,
    LeaderboardType,
    PlayerStats,
    PlayerRank,
    Region
} from "@/party/schema";

export interface MatchResult {
    isWin: boolean;
    role: 'HACKER' | 'IMPOSTOR';
    testCasesPassed: number;
    totalTestCases: number;
    timeTakenSeconds: number;
    sabotagesSuccessful?: number; // Impostor metric
    bugsFixed?: number; // Hacker metric
}

export interface XPResult {
    oldXp: number;
    newXp: number;
    xpGained: number;
    oldRank: PlayerRank;
    newRank: PlayerRank;
    rankUp: boolean;
}

const RANKS: { rank: PlayerRank; xp: number }[] = [
    { rank: 'Script Kiddie', xp: 0 },
    { rank: 'Junior Dev', xp: 500 },
    { rank: 'Senior Dev', xp: 1500 },
    { rank: 'Tech Lead', xp: 3000 },
    { rank: 'Architect', xp: 5000 },
    { rank: '10x Engineer', xp: 8000 },
    { rank: 'AI Overlord', xp: 12000 },
];

export class LeaderboardService {
    private static instance: LeaderboardService;

    // Mock Data Cache
    private cache: Map<string, LeaderboardEntry[]> = new Map();

    private constructor() { }

    public static getInstance(): LeaderboardService {
        if (!LeaderboardService.instance) {
            LeaderboardService.instance = new LeaderboardService();
        }
        return LeaderboardService.instance;
    }

    /**
     * Get Leaderboard Data (Mocked with consistent seed)
     */
    public async getLeaderboard(type: LeaderboardType, filter: LeaderboardFilter): Promise<LeaderboardEntry[]> {
        const cacheKey = `${type}-${filter}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        const data = this.generateMockLeaderboard(type);
        this.cache.set(cacheKey, data);
        return data;
    }

    /**
     * Get Local Player Profile
     */
    public getPlayerProfile(): PlayerStats {
        if (typeof window === 'undefined') return this.getEmptyStats();

        const stored = localStorage.getItem('codelafda_stats');
        if (stored) {
            return JSON.parse(stored);
        }
        return this.getEmptyStats();
    }

    /**
     * Process Match Result & Update Stats
     */
    public submitMatchResult(result: MatchResult): XPResult {
        const stats = this.getPlayerProfile();

        // Calcluate XP Gain
        let xpGain = result.isWin ? 100 : 25;

        // Bonus XP
        if (result.role === 'HACKER') {
            xpGain += (result.testCasesPassed / result.totalTestCases) * 50; // Accuracy bonus
            if (result.bugsFixed) xpGain += result.bugsFixed * 10;
        } else {
            if (result.sabotagesSuccessful) xpGain += result.sabotagesSuccessful * 20; // Deception bonus
        }

        // Speed bonus
        if (result.timeTakenSeconds < 120 && result.isWin) xpGain += 30;

        const oldXp = stats.xp;
        const newXp = oldXp + Math.round(xpGain);
        const oldRank = stats.rank;
        const newRank = this.calculateRank(newXp);

        // Update Stats
        stats.totalMatches += 1;
        if (result.isWin) {
            stats.wins += 1;
            if (result.role === 'IMPOSTOR') stats.impostorWins += 1;
            else stats.hackerWins += 1;
        }
        stats.xp = newXp;
        stats.rank = newRank;

        // Update Averages (Simple weighted avg)
        const accuracy = (result.testCasesPassed / Math.max(1, result.totalTestCases)) * 100;
        stats.accuracy = Math.round((stats.accuracy * (stats.totalMatches - 1) + accuracy) / stats.totalMatches);

        if (typeof window !== 'undefined') {
            localStorage.setItem('codelafda_stats', JSON.stringify(stats));
        }

        return {
            oldXp,
            newXp,
            xpGained: Math.round(xpGain),
            oldRank,
            newRank,
            rankUp: oldRank !== newRank
        };
    }

    private calculateRank(xp: number): PlayerRank {
        let currentRank: PlayerRank = 'Script Kiddie';
        for (const r of RANKS) {
            if (xp >= r.xp) currentRank = r.rank;
            else break;
        }
        return currentRank;
    }

    private getEmptyStats(): PlayerStats {
        return {
            totalMatches: 0,
            wins: 0,
            impostorWins: 0,
            hackerWins: 0,
            accuracy: 0,
            avgSpeed: 0,
            deceptionScore: 0,
            collaborationScore: 0,
            xp: 0,
            rank: 'Script Kiddie',
            badges: [],
            region: 'Global'
        };
    }

    private generateMockLeaderboard(type: LeaderboardType): LeaderboardEntry[] {
        const entries: LeaderboardEntry[] = [];
        const count = 10;

        const adjectives = ['Cyber', 'Neon', 'Quantum', 'Null', 'Void', 'Shadow', 'Root', 'Sudo'];
        const nouns = ['Ninja', 'Coder', 'Hacker', 'Phantom', 'Glitch', 'Daemon', 'Bot', 'Wiz'];

        for (let i = 0; i < count; i++) {
            const username = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 99)}`;

            entries.push({
                playerId: `mock-${i}`,
                username,
                value: Math.floor(10000 - (i * 800) + (Math.random() * 200)),
                rank: i + 1,
                change: Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0,
                region: type === 'Global' || Object.values(type as string).length < 3 ? 'India' : (type as Region), // Fallback logic
                // mainStack: 'Python' // Simplified
            });
        }
        return entries;
    }
}
