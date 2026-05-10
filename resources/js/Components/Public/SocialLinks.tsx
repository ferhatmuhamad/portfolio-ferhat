import {
    Facebook,
    Github,
    Instagram,
    Linkedin,
    Link as LinkIcon,
    Mail,
    Twitter,
    Youtube,
    type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const ICONS: Record<string, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter,
    x: Twitter,
    youtube: Youtube,
    facebook: Facebook,
    email: Mail,
    mail: Mail,
};

const LABELS: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    twitter: "Twitter / X",
    x: "X (Twitter)",
    youtube: "YouTube",
    facebook: "Facebook",
    email: "Email",
    mail: "Email",
};

interface SocialLinksProps {
    socials?: Record<string, string> | null;
    /** Visual size variant. */
    size?: "sm" | "md" | "lg";
    /** Optional extra classes for the outer wrapper. */
    className?: string;
}

/**
 * Renders every populated entry from `profile.socials` as an icon button.
 * Unknown keys still render with a generic link icon so adding a new social
 * never requires a code change.
 */
export function SocialLinks({
    socials,
    size = "md",
    className,
}: SocialLinksProps) {
    const entries = Object.entries(socials || {}).filter(
        ([, url]) => typeof url === "string" && url.trim() !== "",
    );
    if (!entries.length) return null;

    const sizing =
        size === "sm"
            ? { box: "h-9 w-9", icon: 14 }
            : size === "lg"
              ? { box: "h-12 w-12", icon: 20 }
              : { box: "h-10 w-10", icon: 16 };

    return (
        <div className={cn("flex flex-wrap gap-2.5", className)}>
            {entries.map(([key, url]) => {
                const k = key.toLowerCase();
                const Icon = ICONS[k] || LinkIcon;
                const label = LABELS[k] || key;
                return (
                    <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className={cn(
                            "group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-brand-500/15 hover:text-white",
                            sizing.box,
                        )}
                    >
                        <Icon size={sizing.icon} />
                    </a>
                );
            })}
        </div>
    );
}
