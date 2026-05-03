import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { PageProps } from "@/types";

function WhatsAppIcon({ size = 28 }: { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={size}
            height={size}
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.715.315-.442.472-.86 1.346-.86 2.305 0 .76.305 1.519.658 2.205 1.005 1.927 2.708 3.624 4.728 4.557.7.33 1.418.587 2.16.787.787.215 1.518.187 2.32.043.945-.158 1.86-.701 2.247-1.575.115-.27.13-.51.072-.762-.057-.244-.474-.444-.974-.687-.342-.157-1.046-.503-1.275-.503zm-2.91 7.747h-.014a8.183 8.183 0 0 1-4.165-1.143l-.298-.177-3.094.811.825-3.014-.194-.31a8.151 8.151 0 0 1-1.249-4.341c.002-4.508 3.671-8.176 8.184-8.176a8.13 8.13 0 0 1 5.785 2.398 8.121 8.121 0 0 1 2.394 5.785c-.001 4.508-3.671 8.167-8.176 8.167h.002zm6.962-15.135A9.78 9.78 0 0 0 16.196 6.7c-5.43 0-9.85 4.42-9.851 9.85a9.83 9.83 0 0 0 1.314 4.926L6.225 26.7l5.378-1.41a9.852 9.852 0 0 0 4.71 1.2h.004c5.43 0 9.85-4.42 9.852-9.852a9.793 9.793 0 0 0-2.886-6.971z" />
        </svg>
    );
}

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
                className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition-all duration-300 hover:scale-110 hover:shadow-glow-lg"
                aria-label="Chat on WhatsApp"
            >
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
                <WhatsAppIcon size={38} />
            </a>
        </div>
    );
}
