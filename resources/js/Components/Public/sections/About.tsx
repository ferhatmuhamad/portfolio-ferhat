import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";
import { Download, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PageProps } from "@/types";
import { Section, SectionHeader } from "@/Components/ui/Section";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const duration = 1600;
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

    return (
        <Section id="about" light>
            <div className="grid items-center gap-14 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[2.5rem] border border-ink-900/10 bg-cream-100 shadow-[0_30px_80px_-30px_rgba(20,20,28,0.25)]">
                        {profile?.avatar_url ? (
                            <img
                                src={profile.avatar_url}
                                alt={profile.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center font-display text-9xl font-bold text-brand-500">
                                {profile?.name?.[0] || "F"}
                            </div>
                        )}
                        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-ink-900/10 bg-cream-50/95 p-4 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <span className="flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-60" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                </span>
                                <span className="text-sm font-medium text-ink-900">
                                    {t("hero.available")}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* decorative blob */}
                    <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-brand-gradient opacity-30 blur-3xl" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <SectionHeader
                        eyebrow={t("about.eyebrow")}
                        title={t("about.title")}
                        light
                        align="left"
                    />
                    <p className="text-lg leading-relaxed text-ink-700">
                        {summary}
                    </p>

                    {profile?.stats && profile.stats.length > 0 && (
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            {profile.stats.map((s, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-ink-900/10 bg-cream-50 p-4 text-center"
                                >
                                    <div className="font-display text-3xl font-bold text-brand-600">
                                        <CountUp
                                            value={s.value}
                                            suffix={s.suffix || "+"}
                                        />
                                    </div>
                                    <div className="mt-1 text-xs font-medium text-ink-700">
                                        {i18n.language === "id" && s.label_id
                                            ? s.label_id
                                            : s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 flex flex-wrap gap-3">
                        {profile?.cv_url && (
                            <a
                                href={profile.cv_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-light"
                            >
                                <Download size={16} />
                                {t("about.downloadCv")}
                            </a>
                        )}
                        <a href="#contact" className="btn-light">
                            <MessageSquare size={16} />
                            {t("about.letsTalk")}
                        </a>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
