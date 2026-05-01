import { usePage } from "@inertiajs/react";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { PageProps } from "@/types";

export function FloatingWhatsApp() {
    const { profile } = usePage<PageProps>().props;
    const [showTip, setShowTip] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 800);
        const tip = setTimeout(() => setShowTip(true), 1800);
        const hide = setTimeout(() => setShowTip(false), 7000);
        return () => {
            clearTimeout(t);
            clearTimeout(tip);
            clearTimeout(hide);
        };
    }, []);

    if (!profile?.whatsapp) return null;

    const number = profile.whatsapp.replace(/\D/g, "");
    const message = encodeURIComponent(
        "Hi Ferhat! I'd like to discuss a project with you.",
    );
    const href = `https://wa.me/${number}?text=${message}`;

    return (
        <div
            className={cn(
                "fixed bottom-5 right-5 z-50 flex items-end gap-3 transition-all duration-700",
                visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0",
            )}
        >
            {showTip && (
                <div className="hidden animate-fade-in-up rounded-2xl border border-white/10 bg-ink-800/90 px-4 py-2.5 text-sm text-ink-100 shadow-glass backdrop-blur-2xl sm:block">
                    <span className="block text-xs text-ink-300">
                        {profile.name}
                    </span>
                    Need a website? Let's chat 👋
                </div>
            )}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition-all duration-300 hover:scale-110 hover:shadow-glow-lg"
                aria-label="Chat on WhatsApp"
            >
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
                <MessageCircle
                    size={26}
                    strokeWidth={2.2}
                    className="relative z-10 fill-white/10"
                />
            </a>
        </div>
    );
}
