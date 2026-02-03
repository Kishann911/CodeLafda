import { useCallback } from 'react';
import gsap from 'gsap';

export const useScreenShake = () => {
    const shake = useCallback((elementSelector: string | Element = 'body', intensity: number = 10, duration: number = 0.5) => {
        const target = typeof elementSelector === 'string' ? document.querySelector(elementSelector) : elementSelector;
        if (!target) return;

        gsap.fromTo(target,
            { x: 0, y: 0 },
            {
                x: () => (Math.random() - 0.5) * intensity,
                y: () => (Math.random() - 0.5) * intensity,
                duration: 0.05,
                repeat: Math.floor(duration / 0.05),
                yoyo: true,
                clearProps: 'x,y',
                onComplete: () => {
                    gsap.set(target, { x: 0, y: 0 });
                }
            }
        );
    }, []);

    return { shake };
};
