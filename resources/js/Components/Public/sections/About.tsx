import {
    motion,
    useInView,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";
import { MessageSquare, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PageProps } from "@/types";
import { Section, SectionHeader } from "@/Components/ui/Section";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const duration = 1800;
        const start = performance.now();
        let raf = 0;
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, value]);
    return (
        <span ref={ref}>
            {n}
            {suffix}
        </span>
    );
}

export function About() {
    const { t, i18n } = useTranslation();
    const { profile } = usePage<PageProps>().props;
    const summary =
        i18n.language === "id"
            ? profile?.summary_id || profile?.summary
            : profile?.summary;
    const aboutImage = profile?.about_image_url || profile?.avatar_url || null;

    const sectionRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const yPhoto = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const yOrb = useTransform(scrollYProgress, [0, 1], [-40, 60]);

    // 3D tilt
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
        stiffness: 120,
        damping: 14,
    });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
        stiffness: 120,
        damping: 14,
    });
    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <Section id="about">
            <div ref={sectionRef} className="relative">
                {/* Decorative accents */}
                <motion.div
                    style={{ y: yOrb }}
                    aria-hidden
                    className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-500/15 blur-[120px]"
                />
                <motion.div
                    style={{ y: yPhoto }}
                    aria-hidden
                    className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-sun-500/10 blur-[140px]"
                />

                <div className="grid items-center gap-14 lg:grid-cols-12">
                    {/* Left: photo + floating cards */}
                    <motion.div
                        style={{ y: yPhoto }}
                        ref={photoRef}
                        onMouseMove={onMove}
                        onMouseLeave={onLeave}
                        className="relative hidden lg:col-span-5 lg:block"
                    >
                        <motion.div
                            style={{
                                rotateX: rx,
                                rotateY: ry,
                                transformPerspective: 1200,
                            }}
                            className="relative mx-auto aspect-[4/5] max-w-md will-change-transform"
                        >
                            {/* Glow ring */}
                            <div
                                aria-hidden
                                className="absolute -inset-4 rounded-[2.75rem] opacity-70 blur-2xl"
                                style={{
                                    background:
                                        "conic-gradient(from 90deg, rgba(255,122,26,0.45), rgba(255,209,102,0.25), rgba(255,122,26,0.45))",
                                }}
                            />
                            {/* Decorative dotted square */}
                            <div
                                aria-hidden
                                className="absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl border border-dashed border-brand-400/30"
                            />
                            <div
                                aria-hidden
                                className="absolute -right-5 -top-5 h-20 w-20 rounded-full border border-white/10"
                            />

                            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-900/60 shadow-glass-lg backdrop-blur-xl">
                                {aboutImage ? (
                                    <img
                                        src={aboutImage}
                                        alt={profile?.name || "About"}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center font-display text-9xl font-bold text-brand-500/60">
                                        {profile?.name?.[0] || "F"}
                                    </div>
                                )}

                                {/* Top label */}
                                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-100 backdrop-blur-md">
                                    <Sparkles
                                        size={12}
                                        className="text-brand-300"
                                    />
                                    About
                                </div>

                                {/* Bottom availability card */}
                                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-ink-950/70 p-4 backdrop-blur-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-70" />
                                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                        </span>
                                        <span className="text-sm font-medium text-white">
                                            {t("hero.available")}
                                        </span>
                                    </div>
                                </div>

                                {/* Sheen */}
                                <div
                                    aria-hidden
                                    className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent mix-blend-overlay"
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-7"
                    >
                        <SectionHeader
                            eyebrow={t("about.eyebrow")}
                            title={t("about.title")}
                            align="left"
                        />
                        <p className="text-lg leading-relaxed text-ink-100">
                            {summary}
                        </p>

                        {profile?.stats && profile.stats.length > 0 && (
                            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                                {profile.stats.map((s, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.2 + i * 0.1,
                                            duration: 0.5,
                                        }}
                                        whileHover={{ y: -4 }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-md transition-colors hover:border-brand-400/40"
                                    >
                                        <div
                                            aria-hidden
                                            className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                            style={{
                                                background:
                                                    "radial-gradient(120% 80% at 50% 0%, rgba(255,122,26,0.18), transparent 70%)",
                                            }}
                                        />
                                        <div className="font-display text-3xl font-bold text-gradient">
                                            <CountUp
                                                value={s.value}
                                                suffix={s.suffix || "+"}
                                            />
                                        </div>
                                        <div className="mt-1 text-xs font-medium text-ink-200">
                                            {i18n.language === "id" &&
                                            s.label_id
                                                ? s.label_id
                                                : s.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="#contact" className="btn-primary">
                                <MessageSquare size={16} />
                                {t("about.letsTalk")}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
