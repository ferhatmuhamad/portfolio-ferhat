import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { Glass } from "@/Components/ui/Glass";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

export interface PricingPlan {
    id: number;
    name: string;
    name_id?: string;
    tagline?: string;
    tagline_id?: string;
    price: number | null;
    currency?: string;
    billing_period?: string;
    features?: string[] | null;
    features_id?: string[] | null;
    is_popular?: boolean;
    cta_label?: string;
    cta_url?: string;
}

export function Pricing({ plans }: { plans: PricingPlan[] }) {
    const { t, i18n } = useTranslation();
    const isId = i18n.language === "id";
    if (!plans?.length) return null;

    return (
        <Section id="pricing">
            <SectionHeader
                eyebrow={t("pricing.eyebrow")}
                title={t("pricing.title")}
                subtitle={t("pricing.subtitle")}
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((p, i) => {
                    const features =
                        (isId && p.features_id?.length
                            ? p.features_id
                            : p.features) || [];
                    const price = p.price
                        ? formatCurrency(p.price, p.currency || "IDR")
                        : t("pricing.custom");
                    return (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.55, delay: i * 0.08 }}
                            className={cn(
                                "relative",
                                p.is_popular && "lg:-translate-y-3",
                            )}
                        >
                            {p.is_popular && (
                                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-gradient px-4 py-1 text-xs font-bold text-ink-900 shadow-glow">
                                    <Sparkles className="mr-1 inline h-3 w-3" />
                                    {t("pricing.popular")}
                                </span>
                            )}
                            <Glass
                                className={cn(
                                    "flex h-full flex-col p-8",
                                    p.is_popular &&
                                        "border-brand-500/40 ring-1 ring-brand-500/30",
                                )}
                            >
                                <h3 className="font-display text-xl font-semibold text-white">
                                    {isId && p.name_id ? p.name_id : p.name}
                                </h3>
                                <p className="mt-1 text-sm text-ink-300">
                                    {isId && p.tagline_id
                                        ? p.tagline_id
                                        : p.tagline}
                                </p>
                                <div className="mt-6 flex items-baseline gap-1.5">
                                    {p.price && (
                                        <span className="text-xs text-ink-300">
                                            {t("pricing.from")}
                                        </span>
                                    )}
                                    <span className="font-display text-4xl font-bold text-white">
                                        {price}
                                    </span>
                                    {p.billing_period && (
                                        <span className="text-sm text-ink-300">
                                            /{p.billing_period}
                                        </span>
                                    )}
                                </div>
                                <ul className="my-6 flex-1 space-y-2.5 border-y border-white/5 py-6">
                                    {features.map((f, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-2.5 text-sm text-ink-100"
                                        >
                                            <Check
                                                size={16}
                                                className="mt-0.5 shrink-0 text-brand-400"
                                            />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={p.cta_url || "#contact"}
                                    className={cn(
                                        p.is_popular
                                            ? "btn-primary"
                                            : "btn-ghost",
                                        "justify-center",
                                    )}
                                >
                                    {p.cta_label || t("nav.hireMe")}
                                </a>
                            </Glass>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
}
