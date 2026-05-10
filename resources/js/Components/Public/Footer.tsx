import { usePage } from "@inertiajs/react";
import {
    ArrowUpRight,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PageProps } from "@/types";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
    const { profile, site, locale } = usePage<PageProps>().props;
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    const isID = locale === "id";
    const summary =
        (isID && profile?.summary_id ? profile.summary_id : profile?.summary) ||
        profile?.headline ||
        "";
    const ctaHref = buildWhatsAppUrl(profile) || "#contact";
    const ctaIsExternal = ctaHref.startsWith("http");

    const navLinks: Array<{ label: string; href: string }> = [
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.services"), href: "#services" },
        { label: t("nav.projects"), href: "#projects" },
        { label: t("nav.experience"), href: "#experience" },
        { label: t("nav.contact"), href: "#contact" },
    ];

    return (
        <footer className="relative overflow-hidden border-t border-white/5 bg-ink-950 pt-24 pb-10">
            {/* Decorative orbs */}
            <div
                aria-hidden
                className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-500/15 blur-[140px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -bottom-10 h-96 w-96 rounded-full bg-sun-500/10 blur-[160px]"
            />
            {/* Soft grid pattern */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent"
            />

            <div className="container relative">
                {/* CTA card */}
                <div className="mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-500/15 via-ink-900/60 to-ink-950/80 p-8 backdrop-blur-xl shadow-glass-lg sm:p-10">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/30 blur-[120px]"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -left-10 -bottom-16 h-56 w-56 rounded-full bg-sun-400/20 blur-[120px]"
                    />
                    <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-200 backdrop-blur-md">
                                <Sparkles size={12} />
                                {t("hero.available")}
                            </div>
                            <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                                {t("footer.cta.title")}
                            </h3>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-200 sm:text-base">
                                {t("footer.cta.subtitle")}
                            </p>
                        </div>
                        <a
                            href={ctaHref}
                            target={ctaIsExternal ? "_blank" : undefined}
                            rel={ctaIsExternal ? "noopener noreferrer" : undefined}
                            className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition-all hover:shadow-glow-lg"
                        >
                            {t("footer.cta.button")}
                            <ArrowUpRight
                                size={16}
                                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>
                    </div>
                </div>

                <div className="grid gap-12 md:grid-cols-12">
                    {/* Brand block */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient font-display text-xl font-bold text-ink-900 shadow-glow">
                                F
                                <span className="absolute -inset-1 -z-10 rounded-2xl bg-brand-500/30 blur-md" />
                            </div>
                            <div>
                                <p className="font-display text-lg font-semibold text-white">
                                    {profile?.name}
                                </p>
                                <p className="text-sm text-ink-300">
                                    {site?.tagline}
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
                            {summary}
                        </p>
                        <div className="mt-6 flex gap-2.5">
                            {profile?.socials?.github && (
                                <a
                                    href={profile.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-brand-500/15 hover:text-white"
                                >
                                    <Github size={16} />
                                </a>
                            )}
                            {profile?.socials?.linkedin && (
                                <a
                                    href={profile.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-brand-500/15 hover:text-white"
                                >
                                    <Linkedin size={16} />
                                </a>
                            )}
                            {profile?.socials?.instagram && (
                                <a
                                    href={profile.socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-brand-500/15 hover:text-white"
                                >
                                    <Instagram size={16} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick nav */}
                    <div className="md:col-span-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">
                            {t("footer.explore")}
                        </h3>
                        <ul className="mt-5 space-y-3 text-sm">
                            {navLinks.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        className="group inline-flex items-center gap-1.5 text-ink-100 transition-colors hover:text-brand-300"
                                    >
                                        <span className="h-px w-3 bg-ink-500 transition-all group-hover:w-5 group-hover:bg-brand-400" />
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-4">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">
                            {t("footer.getInTouch")}
                        </h3>
                        <ul className="mt-5 space-y-4 text-sm">
                            {profile?.email && (
                                <li className="group flex items-center gap-3 text-ink-100">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-300 transition-colors group-hover:border-brand-400/40 group-hover:text-brand-200">
                                        <Mail size={14} />
                                    </span>
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="break-all leading-relaxed hover:text-brand-300"
                                    >
                                        {profile.email}
                                    </a>
                                </li>
                            )}
                            {profile?.phone && (
                                <li className="group flex items-center gap-3 text-ink-100">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-300 transition-colors group-hover:border-brand-400/40 group-hover:text-brand-200">
                                        <Phone size={14} />
                                    </span>
                                    <a
                                        href={`tel:${profile.phone}`}
                                        className="leading-relaxed hover:text-brand-300"
                                    >
                                        {profile.phone}
                                    </a>
                                </li>
                            )}
                            {profile?.location && (
                                <li className="group flex items-center gap-3 text-ink-100">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-300 transition-colors group-hover:border-brand-400/40 group-hover:text-brand-200">
                                        <MapPin size={14} />
                                    </span>
                                    <span className="leading-relaxed">
                                        {profile.location}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-ink-300 sm:flex-row">
                    <p>
                        © {year} {profile?.name}. {t("footer.rights")}
                    </p>
                    <p className="flex items-center gap-1.5">
                        <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        {t("footer.made")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
