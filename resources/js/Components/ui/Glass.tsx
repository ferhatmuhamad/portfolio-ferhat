import { cn } from "@/lib/cn";
import { forwardRef, HTMLAttributes } from "react";

interface GlassProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "strong" | "light";
    as?: keyof JSX.IntrinsicElements;
}

export const Glass = forwardRef<HTMLDivElement, GlassProps>(
    ({ className, variant = "default", as: Tag = "div", ...props }, ref) => {
        const base = {
            default: "glass-card",
            strong: "glass-strong rounded-2xl overflow-hidden",
            light: "glass-light rounded-2xl overflow-hidden",
        }[variant];
        const Component = Tag as any;
        return (
            <Component ref={ref} className={cn(base, className)} {...props} />
        );
    },
);
Glass.displayName = "Glass";
