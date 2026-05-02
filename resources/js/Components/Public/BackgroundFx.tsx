import { useEffect, useRef } from "react";

/**
 * Cinematic background:
 * - Animated grid that drifts
 * - Aurora gradient mesh
 * - Floating organic blobs
 * - Vertical light beams
 * - Mouse-follow spotlight
 * - Noise grain
 *
 * Fixed to viewport, sits behind all content (z-index -10).
 */
export function BackgroundFx() {
    const spotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = spotRef.current;
        if (!el) return;
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        if (isCoarse) return;

        let raf = 0;
        let tx = window.innerWidth / 2;
        let ty = window.innerHeight / 2;
        let cx = tx;
        let cy = ty;

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
        };

        const tick = () => {
            cx += (tx - cx) * 0.08;
            cy += (ty - cy) * 0.08;
            el.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`;
            raf = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove);
        raf = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />

            {/* Drifting grid */}
            <div className="absolute inset-0 grid-drift opacity-70" />

            {/* Aurora mesh */}
            <div
                className="absolute -inset-32 opacity-60 animate-aurora"
                style={{
                    backgroundImage: `
                        radial-gradient(ellipse 60% 50% at 20% 20%, rgba(255,122,26,0.18), transparent 60%),
                        radial-gradient(ellipse 50% 50% at 80% 30%, rgba(255,209,102,0.10), transparent 60%),
                        radial-gradient(ellipse 50% 60% at 70% 80%, rgba(199,66,10,0.14), transparent 60%),
                        radial-gradient(ellipse 60% 40% at 30% 90%, rgba(255,154,58,0.10), transparent 65%)
                    `,
                }}
            />

            {/* Organic blobs */}
            <div className="absolute -left-32 top-[12%] h-[420px] w-[420px] animate-blob bg-brand-500/[0.08] blur-3xl" />
            <div
                className="absolute right-[-10%] top-[40%] h-[520px] w-[520px] animate-blob bg-sun-400/[0.07] blur-3xl"
                style={{ animationDelay: "-7s" }}
            />
            <div
                className="absolute left-[20%] bottom-[-10%] h-[480px] w-[480px] animate-blob bg-brand-700/[0.08] blur-3xl"
                style={{ animationDelay: "-14s" }}
            />

            {/* Vertical light beams */}
            <div className="absolute inset-y-0 left-[18%] w-px bg-gradient-to-b from-transparent via-brand-500/40 to-transparent animate-beam" />
            <div
                className="absolute inset-y-0 left-[58%] w-px bg-gradient-to-b from-transparent via-sun-400/30 to-transparent animate-beam"
                style={{ animationDelay: "-2s" }}
            />
            <div
                className="absolute inset-y-0 right-[22%] w-px bg-gradient-to-b from-transparent via-brand-400/30 to-transparent animate-beam"
                style={{ animationDelay: "-4s" }}
            />

            {/* Mouse-follow spotlight */}
            <div
                ref={spotRef}
                className="absolute h-[600px] w-[600px] rounded-full opacity-50 mix-blend-screen will-change-transform"
                style={{
                    background:
                        "radial-gradient(circle at center, rgba(255,154,58,0.18) 0%, rgba(255,122,26,0.06) 40%, transparent 70%)",
                }}
            />

            {/* Noise grain */}
            <div className="absolute inset-0 noise" />

            {/* Bottom vignette */}
            <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-ink-950 to-transparent" />
        </div>
    );
}
