import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function useLenis() {
    useEffect(() => {
        if (lenisInstance) return;
        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisInstance = lenis;
        let rafId = 0;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // Expose for GSAP ScrollTrigger if needed
        (window as any).__lenis = lenis;

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisInstance = null;
            (window as any).__lenis = null;
        };
    }, []);
}

export function getLenis(): Lenis | null {
    return lenisInstance;
}
