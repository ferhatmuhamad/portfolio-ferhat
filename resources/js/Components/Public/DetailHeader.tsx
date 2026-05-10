import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

interface DetailHeaderProps {
    backHref: string;
    backLabel?: string;
}

/**
 * Sticky header used on detail pages (project/blog).
 * Replaces the main Navbar — only shows a back button so visitors don't
 * accidentally jump to a homepage anchor that doesn't exist on this route.
 */
export function DetailHeader({ backHref, backLabel = "Back" }: DetailHeaderProps) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
            <div
                className={cn(
                    "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500",
                    scrolled
                        ? "border-white/10 bg-ink-900/70 shadow-glass backdrop-blur-2xl"
                        : "border-transparent bg-ink-900/30 backdrop-blur-md",
                )}
            >
                <Link
                    href={backHref}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-ink-100 transition-all hover:border-brand-400/40 hover:bg-brand-500/10 hover:text-white"
                >
                    <ArrowLeft
                        size={14}
                        className="transition-transform group-hover:-translate-x-0.5"
                    />
                    {backLabel}
                </Link>

                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg font-bold text-ink-900 shadow-glow">
                        F
                    </div>
                </Link>
            </div>
        </header>
    );
}
