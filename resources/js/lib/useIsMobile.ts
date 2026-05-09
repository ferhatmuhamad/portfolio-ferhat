import { useEffect, useState } from "react";

/**
 * Returns true on touch / coarse-pointer devices (phones, most tablets).
 * Used to skip expensive desktop-only effects (parallax, mouse-follow, GSAP timelines, etc.).
 */
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia(
            "(pointer: coarse), (max-width: 767px)",
        );
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);
    return isMobile;
}
