import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface DetailHeroProps {
    eyebrow?: string;
    title: ReactNode;
    breadcrumbs: BreadcrumbItem[];
}

/**
 * Bold brand-gradient hero band for detail pages — orange/sun gradient
 * background with black title text, breadcrumb, eyebrow chip, and a soft
 * decorative pattern. Includes a curved bottom edge for a modern feel.
 */
export function DetailHero({ eyebrow, title, breadcrumbs }: DetailHeroProps) {
    return (
        <section className="relative overflow-hidden">
            {/* Brand gradient background */}
            <div className="relative bg-brand-gradient">
                {/* Subtle dotted overlay for texture */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.6) 1px, transparent 0)",
                        backgroundSize: "22px 22px",
                    }}
                />
                {/* Warm glow blob top-right */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 right-[-10%] h-80 w-80 rounded-full bg-sun-300/60 blur-[120px]"
                />
                {/* Deep amber blob bottom-left */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-24 left-[-8%] h-80 w-80 rounded-full bg-brand-700/40 blur-[120px]"
                />
                {/* Top hairline */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"
                />

                <div className="container relative pb-16 pt-28 sm:pb-20 sm:pt-32 md:pb-24 md:pt-36">
                    {/* Breadcrumb */}
                    <nav
                        aria-label="Breadcrumb"
                        className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink-900/80"
                    >
                        {breadcrumbs.map((crumb, i) => {
                            const isLast = i === breadcrumbs.length - 1;
                            return (
                                <span
                                    key={`${crumb.label}-${i}`}
                                    className="inline-flex items-center gap-1.5"
                                >
                                    {i > 0 && (
                                        <ChevronRight
                                            size={12}
                                            className="text-ink-900/50"
                                        />
                                    )}
                                    {crumb.href && !isLast ? (
                                        <Link
                                            href={crumb.href}
                                            className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-ink-900/10 hover:text-ink-900"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span
                                            className={
                                                isLast
                                                    ? "max-w-[60vw] truncate rounded-md bg-ink-900/10 px-2 py-0.5 font-semibold text-ink-900"
                                                    : "rounded-md px-1.5 py-0.5"
                                            }
                                        >
                                            {crumb.label}
                                        </span>
                                    )}
                                </span>
                            );
                        })}
                    </nav>

                    {eyebrow && (
                        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-900/20 bg-ink-900/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-900 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-ink-900" />
                            {eyebrow}
                        </span>
                    )}

                    <h1 className="mt-4 max-w-4xl font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.25)] sm:text-4xl md:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                </div>
            </div>
        </section>
    );
}
