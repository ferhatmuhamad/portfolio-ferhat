import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { PageProps } from "@/types";

const navItems = [
    { href: "#about", key: "about" as const },
    { href: "#services", key: "services" as const },
    { href: "#projects", key: "projects" as const },
    { href: "#experience", key: "experience" as const },
    { href: "#contact", key: "contact" as const },
];

export function Navbar() {
    const { t } = useTranslation();
    const { site, profile } = usePage<PageProps>().props;
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

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
                    "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500",
                    scrolled
                        ? "border-white/10 bg-ink-900/70 shadow-glass backdrop-blur-2xl"
                        : "border-transparent bg-transparent",
                )}
            >
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg font-bold text-ink-900 shadow-glow">
                        F
                    </div>
                    <span className="hidden text-sm font-semibold text-white sm:block">
                        {site?.name || "Ferhat"}
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.key}
                            href={item.href}
                            className="rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-200 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            {t(`nav.${item.key}`)}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <a
                        href="#contact"
                        className="hidden rounded-full bg-brand-gradient px-4 py-1.5 text-sm font-semibold text-ink-900 shadow-glow transition-all hover:shadow-glow-lg sm:inline-flex"
                    >
                        {t("nav.hireMe")}
                    </a>
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
                        aria-label="Menu"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-ink-900/90 p-2 backdrop-blur-2xl md:hidden">
                    {navItems.map((item) => (
                        <a
                            key={item.key}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-ink-100 hover:bg-white/5"
                        >
                            {t(`nav.${item.key}`)}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="mt-1 block rounded-xl bg-brand-gradient px-4 py-3 text-center text-sm font-semibold text-ink-900"
                    >
                        {t("nav.hireMe")}
                    </a>
                </div>
            )}
        </header>
    );
}
