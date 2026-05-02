import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Section, SectionHeader } from "@/Components/ui/Section";

export interface SkillItem {
    id: number;
    name: string;
    category: "frontend" | "backend" | "cms" | "other";
    icon?: string;
    level?: number;
}

const categories: SkillItem["category"][] = [
    "frontend",
    "backend",
    "cms",
    "other",
];

const categoryAccent: Record<SkillItem["category"], string> = {
    frontend: "from-brand-500/30 to-sun-500/10",
    backend: "from-sky-500/25 to-emerald-500/10",
    cms: "from-fuchsia-500/25 to-brand-500/10",
    other: "from-emerald-500/25 to-sun-500/10",
};

const categoryDot: Record<SkillItem["category"], string> = {
    frontend: "bg-brand-400",
    backend: "bg-sky-400",
    cms: "bg-fuchsia-400",
    other: "bg-emerald-400",
};

export function Skills({ skills }: { skills: SkillItem[] }) {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const xMarq1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
    const xMarq2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
    const yOrb = useTransform(scrollYProgress, [0, 1], [60, -60]);

    if (!skills?.length) return null;

    const row1 = [...skills, ...skills];
    const row2 = [...skills.slice().reverse(), ...skills.slice().reverse()];

    return (
        <Section id="skills">
            <div ref={ref} className="relative">
                {/* Decorative accents */}
                <motion.div
                    style={{ y: yOrb }}
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -top-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <div className="pt-6 md:pt-10">
                    <SectionHeader
                        eyebrow={t("skills.eyebrow")}
                        title={t("skills.title")}
                    />
                </div>

                {/* Dual marquee with parallax */}
                <div className="relative mb-16 space-y-3">
                    <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
                    <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent" />

                    <div className="overflow-hidden">
                        <motion.div
                            style={{ x: xMarq1 }}
                            className="flex w-max gap-3"
                        >
                            {row1.map((s, i) => (
                                <span
                                    key={`r1-${s.id}-${i}`}
                                    className="group relative whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-ink-100 backdrop-blur-md transition-all hover:border-brand-400/40 hover:bg-brand-500/10 hover:text-white"
                                >
                                    <span
                                        className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${categoryDot[s.category]}`}
                                    />
                                    {s.name}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                    <div className="overflow-hidden">
                        <motion.div
                            style={{ x: xMarq2 }}
                            className="flex w-max gap-3"
                        >
                            {row2.map((s, i) => (
                                <span
                                    key={`r2-${s.id}-${i}`}
                                    className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-ink-200 backdrop-blur-md"
                                >
                                    {s.name}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Category cards */}
                <div className="grid gap-5 md:grid-cols-2">
                    {categories.map((cat, idx) => {
                        const items = skills.filter((s) => s.category === cat);
                        if (!items.length) return null;
                        return (
                            <motion.div
                                key={cat}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: idx * 0.08,
                                }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/20"
                            >
                                {/* Gradient background accent */}
                                <div
                                    aria-hidden
                                    className={`pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br ${categoryAccent[cat]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                                />
                                {/* Floating dot */}
                                <span
                                    className={`absolute right-6 top-6 h-2 w-2 rounded-full ${categoryDot[cat]} shadow-glow`}
                                />

                                <h3 className="mb-1 font-display text-xl font-semibold text-white">
                                    {t(`skills.categories.${cat}`)}
                                </h3>
                                <p className="mb-5 text-xs uppercase tracking-[0.2em] text-ink-300">
                                    {items.length} {t("skills.toolsSuffix")}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((s, i) => (
                                        <motion.span
                                            key={s.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.35,
                                                delay: 0.1 + i * 0.03,
                                            }}
                                            whileHover={{ y: -2, scale: 1.05 }}
                                            className="cursor-default rounded-xl border border-white/10 bg-ink-900/60 px-3 py-1.5 text-sm text-white shadow-sm transition-colors hover:border-brand-400/40 hover:bg-brand-500/15"
                                        >
                                            {s.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}
