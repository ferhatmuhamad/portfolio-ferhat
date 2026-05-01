import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { Glass } from "@/Components/ui/Glass";

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

export function Skills({ skills }: { skills: SkillItem[] }) {
    const { t } = useTranslation();
    if (!skills?.length) return null;

    // Marquee row of all skill names for visual flair
    const marqueeNames = [...skills, ...skills];

    return (
        <Section id="skills">
            <SectionHeader
                eyebrow={t("skills.eyebrow")}
                title={t("skills.title")}
            />

            {/* Marquee */}
            <div className="relative mb-14 overflow-hidden">
                <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
                <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
                <div className="marquee-track flex gap-3">
                    {marqueeNames.map((s, i) => (
                        <span
                            key={`${s.id}-${i}`}
                            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-ink-100 backdrop-blur-md"
                        >
                            {s.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                {categories.map((cat) => {
                    const items = skills.filter((s) => s.category === cat);
                    if (!items.length) return null;
                    return (
                        <motion.div
                            key={cat}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <Glass className="h-full p-6">
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">
                                    {t(`skills.categories.${cat}`)}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((s) => (
                                        <span
                                            key={s.id}
                                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-ink-50 transition-colors hover:border-brand-500/40 hover:bg-brand-500/10"
                                        >
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </Glass>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
}
