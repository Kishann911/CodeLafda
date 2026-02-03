"use client";

import usePartySocket from "partysocket/react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { GameState, ServerMessage, ClientMessage } from "@/party/schema";
import { Play } from "lucide-react";
import usePyodide from "@/hooks/usePyodide";
import { useScreenShake } from "@/hooks/useScreenShake";
import { GlitchOverlay } from "@/components/effects/GlitchOverlay";
import { PhaseAnnouncement } from "@/components/effects/PhaseAnnouncement";
import { RoleReveal } from "@/components/effects/RoleReveal";
import confetti from "canvas-confetti";

// UI Components
import { TopBar } from "@/components/game/parts/TopBar";
import { BottomBar } from "@/components/game/parts/BottomBar";
import { EditorPanel } from "@/components/game/parts/EditorPanel";
import { StatePanel } from "@/components/game/parts/StatePanel";
import { SocialPanel } from "@/components/game/parts/SocialPanel";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { TooltipProvider } from "@/components/onboarding/Tooltip";
import { ResultModal } from "@/components/game/ResultModal";
import { useSound } from "@/hooks/useSound";
import { CenterPanel } from "@/components/lobby/CenterPanel";
import { PlayerListPanel } from "@/components/lobby/PlayerListPanel";
import { TechStackPanel } from "@/components/lobby/TechStackPanel";
import { InstructionPanel } from "@/components/lobby/InstructionPanel";

import { LoadingPhase } from "@/components/game/LoadingPhase";
import { TutorialOverlay } from "@/components/onboarding/TutorialOverlay";
import { LobbyChatPanel } from "@/components/lobby/LobbyChatPanel";
import { CinematicTransition } from "@/components/effects/CinematicTransition";

export default function RoomPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const roomId = params.roomId as string;
    const username = searchParams.get("username") || "Anonymous";

    const [gameState, setGameState] = useState<GameState | null>(null);
    const { runCode, output, isLoading: isPyodideLoading, error: pyodideError } = usePyodide();

    // Connection State
    const [connectionState, setConnectionState] = useState<'connecting' | 'open' | 'closed' | 'error'>('connecting');


    // Motion Hooks
    const { shake } = useScreenShake();
    const { playSound } = useSound();
    const [showRoleReveal, setShowRoleReveal] = useState(false);


    const [prevPhase, setPrevPhase] = useState<string>('LOBBY');

    const socket = usePartySocket({
        host: typeof window !== "undefined"
            ? (window.location.hostname === 'localhost' ? 'localhost:1999' : window.location.host)
            : "localhost:1999",
        room: roomId,
        onOpen(event) {
            console.log(`[WebSocket] Connection opened to room: ${roomId}`);
            setConnectionState('open');

            // Send join message now that connection is confirmed open
            // Using setTimeout to ensure the socket ref is ready
            setTimeout(() => {
                // Get preferences from localStorage
                const storedPrefs = typeof window !== 'undefined'
                    ? localStorage.getItem('codelafda_preferences')
                    : null;
                const preferences = storedPrefs ? JSON.parse(storedPrefs) : undefined;

                const joinMsg: ClientMessage = {
                    type: 'join',
                    username,
                    preferences
                };
                console.log(`[WebSocket] Sending join message:`, joinMsg);
                // The socket variable will be available here due to closure
                if (event.target && typeof (event.target as unknown as { send: (data: string) => void }).send === 'function') {
                    (event.target as unknown as { send: (data: string) => void }).send(JSON.stringify(joinMsg));
                    // Mark as joined
                    // setHasJoined(true);
                }
            }, 0);
        },
        onMessage(event) {
            const msg = JSON.parse(event.data) as ServerMessage;
            if (msg.type === "state-update") {
                const newState = msg.gameState;
                console.log('[WebSocket] State update received');

                // Phase Change Logic
                setGameState(prev => {
                    if (prev?.phase === 'LOBBY' && newState.phase === 'CODING') {
                        setShowRoleReveal(true);
                        playSound('alert');
                    }
                    if (prev?.phase !== newState.phase) {
                        setPrevPhase(prev?.phase || 'LOBBY');
                        if (newState.phase === 'SABOTAGE') {
                            shake('body', 20, 1);
                            playSound('error');
                        }
                    }
                    return newState;
                });
            }
        },
        onError(event) {
            console.error('[WebSocket] Connection error:', event);
            setConnectionState('error');
        },
        onClose(event) {
            console.log('[WebSocket] Connection closed:', event.code, event.reason);
            setConnectionState('closed');
        },
    });

    const handlePlayAgain = () => {
        // Reset local state if needed
        window.location.reload();
    };

    // Connection monitoring (join is now handled in onOpen)
    useEffect(() => {
        console.log(`[WebSocket] Connecting to room: ${roomId}`);
    }, [roomId]);

    // Helper to safely send messages
    const sendMessage = (message: ClientMessage) => {
        if (!socket) {
            console.warn('[WebSocket] Cannot send - socket not initialized');
            return false;
        }
        if (connectionState !== 'open') {
            console.warn('[WebSocket] Cannot send - connection not open:', connectionState);
            return false;
        }
        socket.send(JSON.stringify(message));
        return true;
    };

    // Code Change Handler
    const handleCodeChange = (newCode: string) => {
        if (!gameState) return;
        sendMessage({ type: 'code-change', code: newCode });
    };

    const handleRunCode = async () => {
        if (!gameState?.code) return;
        playSound('click');
        await runCode(gameState.code);

        // Simulate Success/Fail
        if (!gameState.code.includes("Error")) {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            playSound('success');

            // WIN CONDITION CHECK (Mock)
            // In real game, server validates test cases.
            // If code is "perfect", end game.
            if (gameState.code.includes("return a - b")) { // Simple check for demo
                sendMessage({ type: 'end-game' });
            }

        } else {
            shake('body', 10, 0.5);
            playSound('error');
        }
    };

    const handleSabotage = () => {
        if (!socket || !gameState) return;
        const newCode = gameState.code + '\n# SYSTEM CORRUPTION DETECTED\nif True output "Error"';
        handleCodeChange(newCode);
        shake('body', 10, 0.5);
        playSound('alert');
    };

    const handleVote = (targetId: string) => {
        sendMessage({ type: 'vote', targetId });
        playSound('click'); // Or a voting sound
    };

    const toggleReady = () => sendMessage({ type: 'ready' });
    const startGame = () => {
        if (gameState?.hostId === socket?.id) {
            sendMessage({ type: 'start-game' });
        }
    };

    const sabotageActive = gameState?.phase === 'SABOTAGE';
    const me = gameState?.players[socket?.id as string];
    const playersList = gameState ? Object.values(gameState.players) : [];

    if (!gameState) {
        const loadingMessage = connectionState === 'connecting'
            ? 'INITIALIZING NEURAL LINK...'
            : connectionState === 'open'
                ? 'AUTHENTICATING...'
                : connectionState === 'error'
                    ? 'CONNECTION FAILED'
                    : 'DISCONNECTED';

        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-[var(--color-neon-blue)] font-mono">
                <div className="animate-spin mb-4 w-8 h-8 border-2 border-[var(--color-neon-blue)] border-t-transparent rounded-full" />
                <div className="animate-pulse tracking-[0.3em] text-xs">
                    {loadingMessage}
                </div>
                {connectionState === 'error' && (
                    <div className="mt-4 text-xs text-red-500">
                        Check console for details
                    </div>
                )}
            </div>
        );
    }

    return (
        <TooltipProvider>
            <main
                className="h-screen w-full bg-[var(--color-background)] text-white font-sans flex flex-col overflow-hidden relative selection:bg-[var(--color-neon-green)] selection:text-black"
                data-testid="game-loaded"
                data-phase={gameState?.phase}
            >

                {/* --- FX LAYERS --- */}
                {gameState?.loadingProgress && (
                    <LoadingPhase progress={gameState.loadingProgress} />
                )}
                <OnboardingModal />
                <GlitchOverlay active={sabotageActive || false} />
                {gameState.phase !== prevPhase && <PhaseAnnouncement phase={gameState.phase} />}
                {showRoleReveal && me?.role && (
                    <RoleReveal role={me.role} onComplete={() => setShowRoleReveal(false)} />
                )}
                {gameState.phase === 'RESULTS' && (
                    <ResultModal
                        winner={gameState.winner || 'HACKERS'}
                        role={me?.role}
                        onPlayAgain={handlePlayAgain}
                    />
                )}

                <TutorialOverlay />
                <TopBar roomId={roomId} gameState={gameState} />

                {/* --- MAIN CONTENT AREA (GRID) --- */}
                <div className="flex-1 grid grid-cols-12 min-h-0 divide-x divide-white/10 overflow-hidden">

                    <CinematicTransition
                        mode="cyber"
                        triggerKey={gameState.phase === 'LOBBY' ? 'lobby' : 'gameplay'}
                        className="col-span-12 w-full h-full"
                    >
                        {gameState.phase === 'LOBBY' ? (
                            // LOBBY VIEW (Redesigned)
                            <div className="col-span-12 flex flex-col h-full overflow-hidden" data-phase="LOBBY">
                                {/* Upper Section: Players, Info, Stacks */}
                                <div className="flex-1 grid grid-cols-12 min-h-0 divide-x divide-white/10">
                                    {/* LEFT: Player List (3 cols) */}
                                    <div className="col-span-12 md:col-span-3 h-full border-r border-white/10" data-testid="player-list-panel">
                                        <PlayerListPanel
                                            players={playersList}
                                            hostId={gameState.hostId}
                                            currentUserId={socket?.id || ''}
                                        />
                                    </div>

                                    {/* CENTER: Room Info + Instructions (6 cols) */}
                                    <div className="col-span-12 md:col-span-6 h-full flex flex-col overflow-hidden">
                                        {/* Top: Room Info */}
                                        <div className="flex-shrink-0 pt-4">
                                            <CenterPanel
                                                roomId={roomId}
                                                playerCount={playersList.length}
                                                status="Waiting for Players"
                                                data-testid="center-panel"
                                            />
                                        </div>

                                        {/* Middle: Controls */}
                                        <div className="px-8 pb-4 space-y-3 flex-shrink-0">
                                            <button
                                                onClick={toggleReady}
                                                className={`w-full py-4 font-bold uppercase tracking-widest transition-all ${me?.isReady
                                                    ? 'bg-transparent border border-[var(--color-neon-green)] text-[var(--color-neon-green)]'
                                                    : 'bg-[var(--color-neon-green)] text-black hover:scale-[1.02]'
                                                    }`}
                                            >
                                                {me?.isReady ? 'Stand Down' : 'Mark Ready'}
                                            </button>

                                            {gameState.hostId === socket?.id && (
                                                <button
                                                    onClick={startGame}
                                                    disabled={playersList.length < 3 || !playersList.every(p => p.isReady)}
                                                    className="w-full py-4 bg-[var(--color-neon-blue)] text-black font-bold uppercase tracking-widest disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-2"
                                                >
                                                    <Play className="w-4 h-4 fill-current" />
                                                    Initialize Match
                                                    {playersList.length < 3 && (
                                                        <span className="text-xs opacity-70">(Need 3+ players)</span>
                                                    )}
                                                </button>
                                            )}
                                        </div>

                                        {/* Bottom: Instructions */}
                                        <div className="flex-1 overflow-y-auto px-8 pb-4 border-t border-white/10 bg-white/[0.01]">
                                            <InstructionPanel />
                                        </div>
                                    </div>

                                    {/* RIGHT: Tech Stacks (3 cols) */}
                                    <div className="col-span-12 md:col-span-3 h-full border-l border-white/10">
                                        <TechStackPanel selectedStacks={gameState.selectedStacks} />
                                    </div>
                                </div>

                                {/* Lower Section: Chat & Logs (Fixed Height) */}
                                <div className="h-48 border-t border-white/10 shrink-0">
                                    <LobbyChatPanel />
                                </div>
                            </div>
                        ) : (
                            // GAMEPLAY VIEW (3-Column)
                            <>
                                {/* LEFT: Editor (5 Cols) */}
                                <div className="col-span-12 md:col-span-6 lg:col-span-5 relative z-10">
                                    <EditorPanel
                                        code={gameState.code || ''}
                                        role={me?.role}
                                        isPyodideLoading={isPyodideLoading}
                                        onCodeChange={handleCodeChange}
                                        onRunCode={handleRunCode}
                                        onSabotage={handleSabotage}
                                    />
                                </div>

                                {/* CENTER: State (4 Cols) */}
                                <div className="col-span-12 md:col-span-6 lg:col-span-4 relative z-10 hidden md:block">
                                    <StatePanel
                                        output={output}
                                        role={me?.role}
                                        phase={gameState.phase}
                                        error={pyodideError}
                                    />
                                </div>

                                {/* RIGHT: Social (3 Cols) */}
                                <div className="col-span-12 lg:col-span-3 relative z-10 hidden lg:block border-l border-white/10">
                                    <SocialPanel
                                        players={playersList}
                                        currentUserId={socket.id}
                                        hostId={gameState.hostId}
                                        onVote={handleVote}
                                        phase={gameState.phase}
                                    />
                                </div>
                            </>
                        )}
                    </CinematicTransition>

                </div>

                {/* --- BOTTOM BAR --- */}
                <BottomBar />

            </main >
        </TooltipProvider >
    );
}
