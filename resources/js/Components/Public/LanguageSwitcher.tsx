import { router, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { PageProps } from "@/types";

const langs = [
    { code: "en", label: "EN", name: "English" },
    { code: "id", label: "ID", name: "Bahasa Indonesia" },
] as const;

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const { locale } = usePage<PageProps>().props;
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    // Sync i18next with server-shared locale
    useEffect(() => {
        if (locale && i18n.language !== locale) i18n.changeLanguage(locale);
    }, [locale, i18n]);

    const switchTo = (code: "en" | "id") => {
        i18n.changeLanguage(code);
        document.cookie = `locale=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
        // Use Inertia visit to refresh shared props with new locale
        router.visit(window.location.pathname + window.location.search, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const current =
        langs.find((l) => l.code === (i18n.language || locale)) || langs[0];

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-semibold uppercase tracking-wider text-ink-100 backdrop-blur-md transition-colors hover:bg-white/10"
            >
                <Globe size={14} />
                {current.label}
            </button>
            {open && (
                <div className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/95 p-1.5 shadow-glass-lg backdrop-blur-2xl">
                    {langs.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => {
                                setOpen(false);
                                switchTo(l.code);
                            }}
                            className={cn(
                                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                                current.code === l.code
                                    ? "bg-brand-500/15 text-brand-300"
                                    : "text-ink-100 hover:bg-white/5",
                            )}
                        >
                            {l.name}
                            <span className="text-xs font-mono text-ink-300">
                                {l.label}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
