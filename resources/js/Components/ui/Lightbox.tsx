import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface LightboxProps {
    images: string[];
    openIndex: number | null;
    onClose: () => void;
    onChange: (i: number) => void;
}

/**
 * Minimal accessible image lightbox:
 * - Esc to close, Arrow keys to navigate
 * - Click backdrop to close
 * - Locks body scroll while open
 */
export function Lightbox({
    images,
    openIndex,
    onClose,
    onChange,
}: LightboxProps) {
    const isOpen = openIndex !== null && images.length > 0;

    const next = useCallback(() => {
        if (openIndex === null) return;
        onChange((openIndex + 1) % images.length);
    }, [openIndex, images.length, onChange]);

    const prev = useCallback(() => {
        if (openIndex === null) return;
        onChange((openIndex - 1 + images.length) % images.length);
    }, [openIndex, images.length, onChange]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen, onClose, next, prev]);

    if (!isOpen) return null;
    const currentSrc = images[openIndex];

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
            onClick={onClose}
        >
            {/* Close */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                aria-label="Close preview"
                className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-brand-400/50 hover:bg-brand-500/15"
            >
                <X size={18} />
            </button>

            {/* Counter */}
            {images.length > 1 && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-white/70">
                    {openIndex + 1} / {images.length}
                </div>
            )}

            {/* Prev / Next */}
            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            prev();
                        }}
                        aria-label="Previous image"
                        className={cn(
                            "absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10",
                            "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white",
                            "transition-all hover:border-brand-400/50 hover:bg-brand-500/15",
                        )}
                    >
                        <ChevronLeft size={22} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            next();
                        }}
                        aria-label="Next image"
                        className={cn(
                            "absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10",
                            "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white",
                            "transition-all hover:border-brand-400/50 hover:bg-brand-500/15",
                        )}
                    >
                        <ChevronRight size={22} />
                    </button>
                </>
            )}

            {/* Image */}
            <img
                key={currentSrc}
                src={currentSrc}
                alt=""
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] max-w-[92vw] rounded-2xl border border-white/10 object-contain shadow-glass-lg animate-fade-in-up"
            />
        </div>
    );
}
