import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { Glass } from "@/Components/ui/Glass";

export interface ServiceItem {
    id: number;
    title: string;
    title_id?: string;
    icon?: string;
    description: string;
    description_id?: string;
    features?: string[] | null;
}

function getIcon(name?: string) {
    if (!name) return Icons.Sparkles;
    const key = name.charAt(0).toUpperCase() + name.slice(1);
    return (Icons as any)[key] || Icons.Sparkles;
}

export function Services({ services }: { services: ServiceItem[] }) {
    const { t, i18n } = useTranslation();
    const isId = i18n.language === "id";

    if (!services?.length) return null;

    return (
        <Section id="services">
            <SectionHeader
                eyebrow={t("services.eyebrow")}
                title={t("services.title")}
                subtitle={t("services.subtitle")}
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
                {services.map((s, i) => {
                    const Icon = getIcon(s.icon);
                    return (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <Glass className="group h-full p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-ink-900 shadow-glow transition-transform group-hover:rotate-6">
                                    <Icon size={26} strokeWidth={2.2} />
                                </div>
                                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                                    {isId && s.title_id ? s.title_id : s.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-ink-200">
                                    {isId && s.description_id
                                        ? s.description_id
                                        : s.description}
                                </p>
                                {s.features && s.features.length > 0 && (
                                    <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                                        {s.features.map((f, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2 text-sm text-ink-100"
                                            >
                                                <Icons.Check
                                                    size={16}
                                                    className="mt-0.5 shrink-0 text-brand-400"
                                                />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Glass>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
}
