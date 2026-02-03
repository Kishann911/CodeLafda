"use client";

import { useCallback } from 'react';

// Using simple oscillator beeps for now to avoid external asset dependency issues
// In a real production app, we would load MP3/WAV files here.
export const useSound = () => {
    const playSound = useCallback((type: 'hover' | 'click' | 'success' | 'error' | 'alert') => {
        if (typeof window === 'undefined') return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!ctxClass) return;

        const ctx = new ctxClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'hover':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200, now);
                osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;
            case 'click':
                osc.type = 'square';
                osc.frequency.setValueAtTime(400, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            case 'success':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.setValueAtTime(880, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
            case 'error':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;
            case 'alert':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.setValueAtTime(400, now + 0.15);
                osc.frequency.setValueAtTime(800, now + 0.3);
                osc.frequency.setValueAtTime(400, now + 0.45);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0.001, now + 0.6);
                osc.start(now);
                osc.stop(now + 0.6);
                break;
        }
    }, []);

    return { playSound };
};
