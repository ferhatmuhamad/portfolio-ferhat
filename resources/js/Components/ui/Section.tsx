import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface SectionProps {
    id?: string;
    eyebrow?: string;
    title?: ReactNode;
    subtitle?: ReactNode;
    children: ReactNode;
    className?: string;
    light?: boolean;
    container?: boolean;
}

export function SectionHeader({
    eyebrow,
    title,
    subtitle,
    light,
    align = "center",
}: {
    eyebrow?: string;
    title?: ReactNode;
    subtitle?: ReactNode;
    light?: boolean;
    align?: "center" | "left";
}) {
    return (
        <div
            className={cn(
                "mb-14 max-w-3xl",
                align === "center" ? "mx-auto text-center" : "text-left",
            )}
        >
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && (
                <h2
                    className={cn(
                        "mt-4 text-balance font-display text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl",
                        light ? "text-ink-900" : "text-white",
                    )}
                >
                    {title}
                </h2>
            )}
            {subtitle && (
                <p
                    className={cn(
                        "mt-5 text-base leading-relaxed sm:text-lg",
                        light ? "text-ink-700" : "text-ink-200",
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export function Section({
    id,
    children,
    className,
    light,
    container = true,
}: SectionProps) {
    return (
        <section
            id={id}
            className={cn("section", light && "section-light", className)}
        >
            <div className={cn("relative", container && "container")}>
                {children}
            </div>
        </section>
    );
}
