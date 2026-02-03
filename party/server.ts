import type * as Party from "partykit/server";
import { GameState, Player, ServerMessage, ClientMessage, PlayerRole, SabotageType, GamePhase, PlayerPreferences } from "./schema";
import { selectQuestion } from "./questions";

export default class CodeLafdaServer implements Party.Server {
    options: Party.ServerOptions = {
        hibernate: true,
    };

    constructor(readonly room: Party.Room) { }

    // Initial State
    gameState: GameState = {
        phase: 'LOBBY',
        players: {},
        hostId: '',
        timer: 0,
        code: '# FIX THE BUG TO DEPLOY\\n\\ndef calculate_sum(a, b):\\n    # TODO: Implement this function\\n    return a - b  # Wait, is this right?',
        output: '',
        missionProgress: 0,
        sabotages: [],
        selectedStacks: [],
    };

    roleHistory: Map<string, PlayerRole[]> = new Map();

    onConnect(conn: Party.Connection) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Connected: ${conn.id} to room ${this.room.id}`);
    }

    onMessage(message: string, sender: Party.Connection) {
        const data = JSON.parse(message) as ClientMessage;

        switch (data.type) {
            case 'join':
                this.handleJoin(sender, data.username, data.preferences);
                break;
            case 'ready':
                this.handleReady(sender);
                break;
            case 'start-game':
                this.handleStartGame(sender);
                break;
            case 'code-change':
                this.gameState.code = data.code;
                this.broadcastState();
                break;
            case 'sabotage':
                if (data.sabotageType && data.targetId !== undefined) {
                    this.handleSabotage(sender, data.sabotageType, data.targetId);
                }
                break;
            case 'vote':
                if (data.targetId) {
                    this.handleVote(sender, data.targetId);
                }
                break;
            case 'kick-player':
                if (data.playerId) {
                    this.handleKickPlayer(sender, data.playerId);
                }
                break;
        }
    }

    handleVote(conn: Party.Connection, targetId: string) {
        // Only allow voting in VOTING phase or for simulation purposes
        // Validating phase might be strict, but let's allow it if players are alive
        const player = this.gameState.players[conn.id];
        if (!player || !player.isAlive) return;

        if (!this.gameState.votes) {
            this.gameState.votes = {};
        }

        this.gameState.votes[conn.id] = targetId;

        // Check if all active players have voted
        const activePlayers = Object.values(this.gameState.players).filter(p => p.isAlive);
        const voteCount = Object.keys(this.gameState.votes).length;

        if (voteCount >= activePlayers.length) {
            this.calculateVoteResults();
        } else {
            this.broadcastState();
        }
    }

    calculateVoteResults() {
        if (!this.gameState.votes) return;

        const voteCounts: Record<string, number> = {};
        Object.values(this.gameState.votes).forEach(targetId => {
            voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
        });

        // Find player with most votes
        let maxVotes = 0;
        let ejectedPlayerId: string | null = null;
        let tie = false;

        Object.entries(voteCounts).forEach(([playerId, count]) => {
            if (count > maxVotes) {
                maxVotes = count;
                ejectedPlayerId = playerId;
                tie = false;
            } else if (count === maxVotes) {
                tie = true;
            }
        });

        if (ejectedPlayerId && !tie) {
            const ejectedPlayer = this.gameState.players[ejectedPlayerId];
            if (ejectedPlayer) {
                ejectedPlayer.isAlive = false;

                // Add system message
                const roleReveal = ejectedPlayer.role;
                this.room.broadcast(JSON.stringify({
                    type: 'chat',
                    senderId: 'SYSTEM',
                    text: `${ejectedPlayer.username} was ejected. They were a ${roleReveal}.`
                }));
            }
        } else {
            this.room.broadcast(JSON.stringify({
                type: 'chat',
                senderId: 'SYSTEM',
                text: `No one was ejected. (Tie or skipped)` // Simplified
            }));
        }

        this.gameState.votes = {}; // Reset votes
        this.checkWinCondition();
    }

    checkWinCondition() {
        const players = Object.values(this.gameState.players);
        const activeImposters = players.filter(p => p.isAlive && p.role === 'IMPOSTOR');
        const activeHackers = players.filter(p => p.isAlive && p.role === 'HACKER');

        if (activeImposters.length === 0) {
            this.gameState.winner = 'HACKERS';
            this.gameState.phase = 'RESULTS';
            this.gameState.loadingProgress = undefined;
        } else if (activeImposters.length >= activeHackers.length) {
            this.gameState.winner = 'IMPOSTORS';
            this.gameState.phase = 'RESULTS';
            this.gameState.loadingProgress = undefined;
        }

        this.broadcastState();
    }

    handleJoin(conn: Party.Connection, username: string, preferences?: PlayerPreferences) {
        const timestamp = new Date().toISOString();
        const isFirstPlayer = Object.keys(this.gameState.players).length === 0;

        // Reset game if it was finished/results and new players join (simple reset logic for demo)
        if (this.gameState.phase === 'RESULTS' && isFirstPlayer) {
            this.resetGame();
        }

        const newPlayer: Player = {
            id: conn.id,
            username,
            isReady: false,
            isAlive: true,
            color: this.getRandomNeonColor(),
            preferences
        };

        if (isFirstPlayer) {
            this.gameState.hostId = conn.id;
            if (preferences?.techStacks && preferences.techStacks.length > 0) {
                this.gameState.selectedStacks = preferences.techStacks;
            }
        } else {
            if (preferences?.techStacks && preferences.techStacks.length > 0) {
                const existingStacks = this.gameState.selectedStacks || [];
                const newStacks = preferences.techStacks.filter((s) => !existingStacks.includes(s));
                this.gameState.selectedStacks = [...existingStacks, ...newStacks];
            }
        }

        this.gameState.players[conn.id] = newPlayer;
        console.log(`[${timestamp}] Player joined: ${newPlayer.username} (${conn.id})`);
        this.broadcastState();
    }

    resetGame() {
        this.gameState = {
            phase: 'LOBBY',
            players: {},
            hostId: '',
            timer: 0,
            code: '# FIX THE BUG TO DEPLOY\\n\\ndef calculate_sum(a, b):\\n    # TODO: Implement this function\\n    return a - b  # Wait, is this right?',
            output: '',
            missionProgress: 0,
            sabotages: [],
            selectedStacks: [],
        };
    }

    handleReady(conn: Party.Connection) {
        const player = this.gameState.players[conn.id];
        if (player) {
            player.isReady = !player.isReady;
            this.broadcastState();
        }
    }

    handleKickPlayer(conn: Party.Connection, playerId: string) {
        if (conn.id !== this.gameState.hostId) return;

        delete this.gameState.players[playerId];
        this.broadcastState();

        this.room.getConnection(playerId)?.close();
    }

    handleSabotage(conn: Party.Connection, sabotageType: SabotageType, targetId?: string) {
        const player = this.gameState.players[conn.id];

        if (player?.role !== 'IMPOSTOR') {
            console.log(`Player ${conn.id} attempted sabotage but is not an imposter`);
            return;
        }

        const power = player.sabotagePowers?.find(p => p.type === sabotageType);
        if (!power) {
            console.log(`Player ${conn.id} does not have sabotage power: ${sabotageType}`);
            return;
        }

        if (power.cooldown > 0) {
            console.log(`Sabotage ${sabotageType} is on cooldown for ${power.cooldown}s`);
            return;
        }

        if (power.usesRemaining <= 0) {
            console.log(`Sabotage ${sabotageType} has no uses remaining`);
            return;
        }

        console.log(`Player ${conn.id} used sabotage: ${sabotageType}`);

        switch (sabotageType) {
            case 'INJECT_BUG':
                this.gameState.code += '\n# SYSTEM_ERROR: Unexpected token detected\n';
                break;
            case 'ALTER_OUTPUT':
                this.gameState.output = '❌ Tests Failed (System Compromised)';
                break;
            case 'DELAY_COMPILE':
                break;
        }

        this.gameState.sabotages.push({
            id: Math.random().toString(36).substring(2, 9),
            type: sabotageType === 'INJECT_BUG' ? 'SYNTAX_ERROR' :
                sabotageType === 'ALTER_OUTPUT' ? 'HIDDEN_BUG' : 'TIME_REDUCTION',
            active: true,
            targetPlayerId: targetId
        });

        power.usesRemaining--;
        power.cooldown = 30;

        setTimeout(() => {
            if (this.gameState.players[conn.id]?.sabotagePowers) {
                const currentPower = this.gameState.players[conn.id].sabotagePowers?.find(p => p.type === sabotageType);
                if (currentPower) {
                    currentPower.cooldown = 0;
                    this.broadcastState();
                }
            }
        }, 30000);

        this.broadcastState();
    }

    async handleStartGame(conn: Party.Connection) {
        if (conn.id !== this.gameState.hostId) {
            this.sendError(conn, 'Only the host can start the game');
            return;
        }

        try {
            await this.transitionToPrepare();
            await this.transitionToLoadCompilers();
            await this.transitionToLoadQuestions();
            await this.transitionToAssignImposter();
            await this.transitionToStartRound();
        } catch (error: unknown) {
            this.handleStartError(error as Error);
        }
    }

    private async transitionToPrepare() {
        this.updatePhase('PREPARE', 'Validating game setup...', 10);

        const players = Object.values(this.gameState.players);

        if (players.length < 3) {
            throw new Error('Need at least 3 players to start');
        }

        if (!players.every(p => p.isReady)) {
            throw new Error('All players must be ready');
        }

        if (!this.gameState.selectedStacks.length) {
            throw new Error('No tech stacks selected');
        }

        await this.delay(500);
    }

    private async transitionToLoadCompilers() {
        this.updatePhase('LOAD_COMPILERS', 'Loading Python compiler...', 30);

        this.room.broadcast(JSON.stringify({
            type: 'load-compiler',
            message: 'Initializing execution environment...'
        }));

        await this.delay(1000);
    }

    private async transitionToLoadQuestions() {
        this.updatePhase('LOAD_QUESTIONS', 'Selecting coding challenge...', 60);

        const question = selectQuestion(this.gameState.selectedStacks);

        if (!question) {
            throw new Error('No questions available for selected tech stacks');
        }

        this.gameState.currentQuestion = question;
        this.gameState.code = question.starterCode;
        this.gameState.currentTask = question.description;

        await this.delay(500);
    }

    private async transitionToAssignImposter() {
        this.updatePhase('ASSIGN_IMPOSTER', 'Assigning roles...', 80);

        this.assignRoles();

        await this.delay(800);
    }

    private async transitionToStartRound() {
        this.updatePhase('START_ROUND', 'Starting match...', 95);

        await this.delay(500);

        this.gameState.phase = 'CODING';
        this.gameState.timer = 300;
        this.gameState.loadingProgress = undefined;

        this.broadcastState();
    }

    private updatePhase(phase: GamePhase, message: string, progress: number) {
        this.gameState.phase = phase;
        this.gameState.loadingProgress = { phase, message, progress };
        this.broadcastState();
    }

    private handleStartError(error: Error) {
        console.error('[Game Start Error]:', error);

        this.gameState.phase = 'LOBBY';
        this.gameState.errorMessage = error.message;
        this.gameState.loadingProgress = undefined;

        this.broadcastState();

        setTimeout(() => {
            this.gameState.errorMessage = undefined;
            this.broadcastState();
        }, 5000);
    }

    private sendError(conn: Party.Connection, message: string) {
        conn.send(JSON.stringify({ type: 'error', message }));
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    assignRoles() {
        const playerIds = Object.keys(this.gameState.players);
        const playerCount = playerIds.length;

        if (playerCount < 3) {
            console.error('Cannot start game with fewer than 3 players');
            throw new Error('Minimum 3 players required to start game');
        }

        let imposterCount = 1;
        if (playerCount >= 6 && playerCount <= 8) imposterCount = 2;
        if (playerCount >= 9) imposterCount = 3;

        console.log(`Assigning ${imposterCount} imposter(s) for ${playerCount} players`);

        const eligibleImpostors = playerIds.filter(id => {
            const history = this.roleHistory.get(id) || [];
            const recentGames = history.slice(-2);
            return !(recentGames.length === 2 && recentGames.every(role => role === 'IMPOSTOR'));
        });

        const candidatePool = eligibleImpostors.length >= imposterCount
            ? eligibleImpostors
            : playerIds;

        const shuffled = [...candidatePool].sort(() => Math.random() - 0.5);
        const impostorIds = shuffled.slice(0, imposterCount);

        playerIds.forEach(id => {
            const role = impostorIds.includes(id) ? 'IMPOSTOR' : 'HACKER';
            this.gameState.players[id].role = role;

            if (role === 'IMPOSTOR') {
                this.gameState.players[id].sabotagePowers = [
                    { type: 'INJECT_BUG', cooldown: 0, maxUses: 3, usesRemaining: 3 },
                    { type: 'ALTER_OUTPUT', cooldown: 0, maxUses: 2, usesRemaining: 2 },
                    { type: 'DELAY_COMPILE', cooldown: 0, maxUses: 2, usesRemaining: 2 },
                ];
            }

            const history = this.roleHistory.get(id) || [];
            history.push(role);
            this.roleHistory.set(id, history);
        });

        console.log(`Assigned ${impostorIds.length} imposter(s):`, impostorIds);
    }

    broadcastState() {
        const message: ServerMessage = {
            type: 'state-update',
            gameState: this.gameState,
        };
        this.room.broadcast(JSON.stringify(message));
    }

    getRandomNeonColor() {
        const colors = [
            'var(--color-neon-green)',
            'var(--color-neon-blue)',
            'var(--color-neon-purple)',
            'var(--color-neon-pink)',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    onClose(conn: Party.Connection) {
        console.log(`Disconnected: ${conn.id}`);
        delete this.gameState.players[conn.id];

        if (this.gameState.hostId === conn.id && Object.keys(this.gameState.players).length > 0) {
            this.gameState.hostId = Object.keys(this.gameState.players)[0];
        }

        this.broadcastState();
    }
}
