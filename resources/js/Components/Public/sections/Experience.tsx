import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/Components/ui/Section";
import { formatDateRange } from "@/lib/format";
import { Briefcase, MapPin, ArrowUpRight } from "lucide-react";

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
    logo_url?: string;
}

export function Experience({ items }: { items: ExperienceItem[] }) {
    const { t, i18n } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const dotsRef = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        if (!items?.length) return;
        const ctx = gsap.context(() => {
            // Animate the vertical line drawing as user scrolls
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        transformOrigin: "top",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 60%",
                            end: "bottom 70%",
                            scrub: 0.6,
                        },
                    },
                );
            }

            // Reveal each card with side-aware slide + fade
            itemsRef.current.forEach((el, i) => {
                if (!el) return;
                const fromX = i % 2 === 0 ? -60 : 60;
                gsap.fromTo(
                    el,
                    {
                        opacity: 0,
                        y: 50,
                        x: fromX,
                        rotateZ: i % 2 === 0 ? -2 : 2,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        rotateZ: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    },
                );
            });

            // Pulse the timeline dots when in view
            dotsRef.current.forEach((el) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    },
                );
            });
        }, sectionRef);

        // Refresh after Lenis settles
        const tid = setTimeout(() => ScrollTrigger.refresh(), 500);

        return () => {
            clearTimeout(tid);
            ctx.revert();
        };
    }, [items]);

    if (!items?.length) return null;

    const setItemRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) itemsRef.current[i] = el;
    };
    const setDotRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) dotsRef.current[i] = el;
    };

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="section relative overflow-hidden"
        >
            <div className="container">
                <SectionHeader
                    eyebrow={t("experience.eyebrow")}
                    title={t("experience.title")}
                />

                <div className="relative mx-auto mt-20 max-w-5xl">
                    {/* Center / left rail */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

                    {/* Animated drawing line on top */}
                    <div
                        ref={lineRef}
                        className="absolute left-6 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-brand-400 via-sun-400 to-brand-600 md:left-1/2 md:-translate-x-1/2"
                        style={{ boxShadow: "0 0 20px rgba(255,122,26,0.6)" }}
                    />

                    <div className="space-y-16 md:space-y-24">
                        {items.map((exp, i) => {
                            const isLeft = i % 2 === 0;
                            const desc =
                                i18n.language === "id" && exp.description_id
                                    ? exp.description_id
                                    : exp.description;
                            const highlights =
                                i18n.language === "id" &&
                                exp.highlights_id?.length
                                    ? exp.highlights_id
                                    : exp.highlights;

                            return (
                                <div
                                    key={exp.id}
                                    className="relative grid items-center gap-6 md:grid-cols-2 md:gap-12"
                                >
                                    {/* Timeline dot */}
                                    <div
                                        ref={setDotRef(i)}
                                        className="absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2"
                                    >
                                        <span className="relative flex h-5 w-5">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
                                            <span className="relative inline-flex h-5 w-5 rounded-full border-2 border-brand-300 bg-ink-900 shadow-glow" />
                                        </span>
                                    </div>

                                    {/* LOGO COLUMN */}
                                    <div
                                        className={`pl-16 md:pl-0 ${
                                            isLeft
                                                ? "md:order-1 md:pr-12 md:text-right"
                                                : "md:order-2 md:pl-12 md:text-left"
                                        }`}
                                    >
                                        <div
                                            ref={setItemRef(i * 2)}
                                            className={`inline-flex flex-col gap-3 ${
                                                isLeft
                                                    ? "md:items-end"
                                                    : "md:items-start"
                                            }`}
                                        >
                                            <div className="group relative">
                                                <div className="absolute -inset-4 rounded-3xl bg-brand-gradient opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
                                                <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] p-3 shadow-glass backdrop-blur-xl md:h-28 md:w-28">
                                                    {exp.logo_url ? (
                                                        <img
                                                            src={exp.logo_url}
                                                            alt={exp.company}
                                                            loading="lazy"
                                                            decoding="async"
                                                            className="h-full w-full object-contain"
                                                        />
                                                    ) : (
                                                        <Briefcase className="h-10 w-10 text-brand-300" />
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className={`flex flex-col gap-1 ${
                                                    isLeft
                                                        ? "md:items-end"
                                                        : "md:items-start"
                                                }`}
                                            >
                                                <span className="font-display text-xl font-bold text-white md:text-2xl">
                                                    {exp.company}
                                                </span>
                                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
                                                    {formatDateRange(
                                                        exp.start_date,
                                                        exp.end_date,
                                                        i18n.language,
                                                    )}
                                                </span>
                                                {exp.location && (
                                                    <span className="flex items-center gap-1 text-xs text-ink-300">
                                                        <MapPin size={11} />
                                                        {exp.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* DESCRIPTION COLUMN */}
                                    <div
                                        className={`pl-16 md:pl-0 ${
                                            isLeft ? "md:order-2" : "md:order-1"
                                        }`}
                                    >
                                        <div
                                            ref={setItemRef(i * 2 + 1)}
                                            className="glass-card group relative rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 md:p-8"
                                        >
                                            {/* Corner accent */}
                                            <div className="absolute right-5 top-5 opacity-0 transition-opacity group-hover:opacity-100">
                                                <ArrowUpRight className="h-5 w-5 text-brand-300" />
                                            </div>

                                            <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                                                {exp.role}
                                            </h3>
                                            {desc && (
                                                <p className="mt-3 text-sm leading-relaxed text-ink-200 md:text-[15px]">
                                                    {desc}
                                                </p>
                                            )}

                                            {highlights?.length ? (
                                                <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                                                    {highlights.map(
                                                        (h, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-3 text-sm text-ink-100"
                                                            >
                                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient shadow-glow" />
                                                                <span>{h}</span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
