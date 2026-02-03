"use client";

import { useState, useEffect } from 'react';
import { LeaderboardService } from '@/lib/progression/LeaderboardService';
import { PlayerRank } from '@/party/schema';

// Helper to get Rank Style
const getRankColor = (rank: PlayerRank) => {
    switch (rank) {
        case 'Script Kiddie': return 'text-gray-500';
        case 'Junior Dev': return 'text-green-500';
        case 'Senior Dev': return 'text-blue-500';
        case 'Tech Lead': return 'text-purple-500';
        case 'Architect': return 'text-orange-500';
        case '10x Engineer': return 'text-red-500';
        case 'AI Overlord': return 'text-[var(--color-neon-gold)] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]';
        default: return 'text-gray-500';
    }
};

const RANKS: { title: PlayerRank; threshold: number }[] = [
    { title: "Script Kiddie", threshold: 0 },
    { title: "Junior Dev", threshold: 500 },
    { title: "Senior Dev", threshold: 1500 },
    { title: "Tech Lead", threshold: 3000 },
    { title: "Architect", threshold: 5000 },
    { title: "10x Engineer", threshold: 8000 },
    { title: "AI Overlord", threshold: 12000 },
];

export const useProgression = () => {
    const service = LeaderboardService.getInstance();
    const [xp, setXp] = useState(0);
    const [rank, setRank] = useState<{ title: PlayerRank; color: string }>({
        title: 'Script Kiddie',
        color: 'text-gray-500'
    });

    useEffect(() => {
        const stats = service.getPlayerProfile();
        // Delay updates to avoid synchronous render warning
        const timer = setTimeout(() => {
            setXp(stats.xp);
            setRank({ title: stats.rank, color: getRankColor(stats.rank) });
        }, 0);
        return () => clearTimeout(timer);
    }, [service]);

    // Simplified for backward compatibility with ResultModal, but ideally should take MatchResult
    const awardXp = (amount: number) => {
        // We create a dummy result for now to reuse the Service logic, 
        // OR we can just cheat and update stats directly if we want to keep it simple.
        // But let's do it properly via the service which handles generic updates if we expand it,
        // For now, simpler: Update local stats manually or add a method 'addXp' to Service.

        // Since Service.submitMatchResult is the main way to add XP, let's construct a minimal result
        // This is a bit hacky given ResultModal logic, but acceptable for this refactor.
        // Actually, ResultModal calculates 'gain'. 

        // Let's just update the local storage directly via Service pattern or simple read/write here
        // to match the previous behavior, but using the new 'codelafda_stats' key.
        const stats = service.getPlayerProfile();
        stats.xp += amount;

        // Recalculate Rank
        const newRankObj = [...RANKS].reverse().find(r => stats.xp >= r.threshold) || RANKS[0];
        stats.rank = newRankObj.title;

        localStorage.setItem('codelafda_stats', JSON.stringify(stats));

        setXp(stats.xp);
        setRank({ title: stats.rank, color: getRankColor(stats.rank) });

        return stats.xp;
    };

    const nextRank = RANKS.find(r => r.threshold > xp);
    const prevThreshold = RANKS.find(r => r.threshold <= xp)?.threshold || 0;
    const progress = nextRank
        ? ((xp - prevThreshold) / (nextRank.threshold - prevThreshold)) * 100
        : 100;

    return { xp, rank, awardXp, nextRank, progress };
};

