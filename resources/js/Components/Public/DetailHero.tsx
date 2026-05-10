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
 * Modern hero band for detail pages — shows a small breadcrumb and a large
 * gradient title. Decorative orbs match the brand styling.
 */
export function DetailHero({ eyebrow, title, breadcrumbs }: DetailHeroProps) {
    return (
        <section className="relative overflow-x-clip pb-12 pt-28 sm:pb-16 sm:pt-32">
            {/* Decorative orbs */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-10 left-1/4 -z-10 h-72 w-72 rounded-full bg-brand-500/15 blur-[140px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -top-16 right-1/4 -z-10 h-72 w-72 rounded-full bg-sun-400/10 blur-[140px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="container relative">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="flex flex-wrap items-center gap-1.5 text-xs text-ink-300"
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
                                        className="text-ink-500"
                                    />
                                )}
                                {crumb.href && !isLast ? (
                                    <Link
                                        href={crumb.href}
                                        className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-white/5 hover:text-brand-300"
                                    >
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={
                                            isLast
                                                ? "max-w-[60vw] truncate rounded-md px-1.5 py-0.5 text-brand-300"
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
                    <span className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.25em] text-brand-400">
                        {eyebrow}
                    </span>
                )}

                <h1 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {title}
                </h1>
            </div>
        </section>
    );
}
