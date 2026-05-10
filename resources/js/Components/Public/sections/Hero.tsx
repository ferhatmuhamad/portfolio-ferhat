import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles, MousePointerClick } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";
import type { PageProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

export function Hero() {
    const isMobile = useIsMobile();
    return isMobile ? <HeroMobile /> : <HeroDesktop />;
}

/* -------------------------------------------------------------------------- */
/* Mobile: lightweight, static-first. No framer-motion, no setInterval,       */
/* no parallax, no spinning conic gradient, no shimmer / blob animations.     */
/* -------------------------------------------------------------------------- */
function HeroMobile() {
    const { t } = useTranslation();
    const { profile } = usePage<PageProps>().props;
    const heroImage = profile?.hero_image_url || profile?.avatar_url || null;
    const firstName = profile?.name?.split(" ")[0] || "Ferhat";
    const restName = profile?.name?.split(" ").slice(1).join(" ") || "Yasin";

    return (
        <section
            id="home"
            className="relative flex flex-col justify-center overflow-hidden pt-28 pb-16 min-h-[100svh]"
        >
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.12] blur-[140px]" />
            </div>

            <div className="container">
                <div className="grid items-center gap-10">
                    <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-200">
                            <span className="relative flex h-2 w-2">
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                            </span>
                            {t("hero.eyebrow")}
                        </div>

                        <h1 className="mt-6 font-display font-bold leading-[1.05] tracking-tight text-white text-[clamp(2.4rem,8vw,4rem)]">
                            <span className="block break-words">
                                {firstName}
                            </span>
                            <span className="text-gradient inline-block break-words">
                                {restName}
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-200">
                            {profile?.headline || t("hero.subtitle")}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a href="#contact" className="btn-primary group">
                                {t("hero.ctaPrimary")}
                                <ArrowRight size={16} />
                            </a>
                        </div>

                        {profile?.stats && profile.stats.length > 0 && (
                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-300">
                                {profile.stats.slice(0, 3).map((s, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-2xl font-display font-bold text-gradient">
                                            {s.value}
                                        </span>
                                        <span className="text-xs uppercase tracking-wider">
                                            {s.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative mx-auto w-full max-w-sm">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-glass-lg">
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-500/10 via-transparent to-sun-400/10" />

                            {heroImage ? (
                                <img
                                    src={heroImage}
                                    alt={profile?.name || "Portrait"}
                                    fetchPriority="high"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-brand-gradient text-9xl font-display font-bold text-ink-900">
                                    {firstName[0]}
                                </div>
                            )}

                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">
                                <span className="rounded-full bg-black/40 px-2 py-1">
                                    {t("hero.badge")}
                                </span>
                            </div>

                            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-xl">
                                <p className="font-display text-base font-semibold text-white">
                                    {profile?.name}
                                </p>
                                <p className="text-[11px] text-white/70">
                                    {profile?.location || profile?.headline}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-center pb-4">
                    <a
                        href="#about"
                        className="group flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-ink-300"
                    >
                        <MousePointerClick size={14} />
                        <span>{t("hero.scroll")}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Desktop: original full experience with framer-motion + parallax + clock.   */
/* -------------------------------------------------------------------------- */
function HeroDesktop() {
    const { t, i18n } = useTranslation();
    const { profile } = usePage<PageProps>().props;
    const heroImage = profile?.hero_image_url || profile?.avatar_url || null;

    const firstName = profile?.name?.split(" ")[0] || "Ferhat";
    const restName = profile?.name?.split(" ").slice(1).join(" ") || "Yasin";

    const cardRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
        stiffness: 150,
        damping: 18,
    });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
        stiffness: 150,
        damping: 18,
    });

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    const time = now.toLocaleTimeString(
        i18n.language === "id" ? "id-ID" : "en-US",
        { hour: "2-digit", minute: "2-digit", hour12: false },
    );

    return (
        <section
            id="home"
            className="relative flex flex-col justify-center overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24 min-h-[100svh] md:min-h-[92vh] md:max-h-[1080px]"
        >
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.14] blur-[180px]" />
            </div>

            <div className="container">
                <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-200 backdrop-blur-md"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                            </span>
                            {t("hero.eyebrow")}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="mt-6 font-display font-bold leading-[1.02] tracking-tight text-white text-[clamp(2.6rem,7vw,5.6rem)]"
                        >
                            <span className="block">{firstName}</span>
                            <span className="text-gradient relative inline-block">
                                {restName}
                                <Sparkles className="absolute -right-7 -top-2 hidden h-6 w-6 text-sun-400 sm:block" />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="mt-5 max-w-xl text-base leading-relaxed text-ink-200 sm:text-lg lg:text-xl"
                        >
                            {profile?.headline || t("hero.subtitle")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className="mt-9 flex flex-wrap items-center gap-3"
                        >
                            <a href="#contact" className="btn-primary group">
                                {t("hero.ctaPrimary")}
                                <ArrowRight
                                    size={16}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </a>
                        </motion.div>

                        {profile?.stats && profile.stats.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-300"
                            >
                                {profile.stats.slice(0, 3).map((s, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-2xl font-display font-bold text-gradient">
                                            {s.value}
                                        </span>
                                        <span className="text-xs uppercase tracking-wider">
                                            {s.label}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        className="relative mx-auto w-full max-w-md lg:col-span-5"
                    >
                        <div className="absolute -inset-6 -z-10 animate-spin-slow opacity-40 blur-2xl">
                            <div
                                className="h-full w-full rounded-full"
                                style={{
                                    background:
                                        "conic-gradient(from 0deg, #ff7a1a, #ffd166, #ff9a3a, #c7420a, #ff7a1a)",
                                }}
                            />
                        </div>

                        <div className="absolute -top-10 -right-6 -z-10 h-40 w-40 animate-blob bg-sun-400/20 blur-3xl" />
                        <div
                            className="absolute -bottom-10 -left-8 -z-10 h-44 w-44 animate-blob bg-brand-500/25 blur-3xl"
                            style={{ animationDelay: "-8s" }}
                        />

                        <motion.div
                            ref={cardRef}
                            onMouseMove={onMove}
                            onMouseLeave={onLeave}
                            style={{
                                rotateX: rx,
                                rotateY: ry,
                                transformPerspective: 1200,
                            }}
                            className="perspective-card relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-glass-lg backdrop-blur-xl ring-glow"
                        >
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-500/10 via-transparent to-sun-400/10" />

                            {heroImage ? (
                                <img
                                    src={heroImage}
                                    alt={profile?.name || "Portrait"}
                                    fetchPriority="high"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-brand-gradient text-9xl font-display font-bold text-ink-900">
                                    {firstName[0]}
                                </div>
                            )}

                            <div
                                className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay animate-shimmer"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                                }}
                            />

                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">
                                <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur-md">
                                    {t("hero.badge")}
                                </span>
                            </div>

                            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-xl">
                                <p className="font-display text-base font-semibold text-white">
                                    {profile?.name}
                                </p>
                                <p className="text-[11px] text-white/70">
                                    {profile?.location || profile?.headline}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            className="absolute -right-6 top-1/2 hidden -translate-y-1/2 animate-float-rev items-center gap-2 rounded-2xl border border-white/15 bg-ink-800/80 px-3 py-2 text-[11px] font-mono text-white shadow-glass backdrop-blur-xl sm:flex"
                        >
                            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                            <span>
                                {time} {t("hero.timezone")}
                            </span>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="mt-16 flex justify-center pb-6 md:mt-20 md:pb-10"
                >
                    <a
                        href="#about"
                        className="group flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-ink-300 transition-colors hover:text-brand-300"
                    >
                        <MousePointerClick
                            size={14}
                            className="transition-transform group-hover:translate-y-1"
                        />
                        <span>{t("hero.scroll")}</span>
                        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-ink-300/40 p-1.5">
                            <span className="h-2 w-1 animate-bounce rounded-full bg-brand-400" />
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
