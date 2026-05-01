import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/Components/ui/Section";
import { Glass } from "@/Components/ui/Glass";
import { formatDateRange } from "@/lib/format";
import { Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    location?: string;
    start_date: string;
    end_date: string | null;
    description?: string;
    description_id?: string;
    highlights?: string[] | null;
    highlights_id?: string[] | null;
}

export function Experience({ items }: { items: ExperienceItem[] }) {
    const { t, i18n } = useTranslation();
    const wrapRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!items?.length) return;
        const ctx = gsap.context(() => {
            const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
            if (!isDesktop) return;

            const track = trackRef.current!;
            const wrap = wrapRef.current!;
            const distance = track.scrollWidth - window.innerWidth + 80;

            gsap.to(track, {
                x: -distance,
                ease: "none",
                scrollTrigger: {
                    trigger: wrap,
                    start: "top top",
                    end: () => `+=${distance}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, wrapRef);
        return () => ctx.revert();
    }, [items]);

    // Refresh ScrollTrigger when Lenis is ready
    useEffect(() => {
        const id = setTimeout(() => ScrollTrigger.refresh(), 400);
        return () => clearTimeout(id);
    }, []);

    if (!items?.length) return null;

    return (
        <section id="experience" className="relative overflow-hidden">
            <div ref={wrapRef} className="section">
                <div className="container">
                    <SectionHeader
                        eyebrow={t("experience.eyebrow")}
                        title={t("experience.title")}
                    />
                </div>
                <div className="overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex gap-6 px-6 pb-10 lg:flex-nowrap lg:px-12 max-lg:flex-col max-lg:overflow-x-visible"
                    >
                        {items.map((exp, i) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="lg:w-[420px] lg:shrink-0"
                            >
                                <Glass className="h-full p-7">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                                            <Briefcase size={20} />
                                        </div>
                                        <div className="text-xs font-mono text-ink-300">
                                            {formatDateRange(
                                                exp.start_date,
                                                exp.end_date,
                                                i18n.language,
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                                        {exp.role}
                                    </h3>
                                    <p className="mt-1 text-sm font-medium text-brand-300">
                                        {exp.company}{" "}
                                        {exp.location && (
                                            <span className="text-ink-300">
                                                · {exp.location}
                                            </span>
                                        )}
                                    </p>
                                    <p className="mt-4 text-sm leading-relaxed text-ink-200">
                                        {i18n.language === "id" &&
                                        exp.description_id
                                            ? exp.description_id
                                            : exp.description}
                                    </p>
                                    {(() => {
                                        const hl =
                                            i18n.language === "id" &&
                                            exp.highlights_id?.length
                                                ? exp.highlights_id
                                                : exp.highlights;
                                        return hl?.length ? (
                                            <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                                                {hl.map((h, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-sm text-ink-100"
                                                    >
                                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                                                        <span>{h}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null;
                                    })()}
                                </Glass>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
