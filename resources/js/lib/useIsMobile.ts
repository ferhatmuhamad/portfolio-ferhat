import { useEffect, useState } from "react";

/**
 * Synchronous initial detection so mobile devices NEVER render the heavy
 * desktop-only DOM (parallax tilt, animated background mesh, etc.) for even
 * a single paint. Updates reactively if the viewport changes.
 */
function detectMobile(): boolean {
    if (typeof window === "undefined") return false;
    try {
        return window.matchMedia("(pointer: coarse), (max-width: 767px)")
            .matches;
    } catch {
        return false;
    }
}

export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(detectMobile);
    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(pointer: coarse), (max-width: 767px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);
    return isMobile;
}
