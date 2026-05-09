import {
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Section, SectionHeader } from "@/Components/ui/Section";
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

function translatePeriod(p: string, t: (k: string) => string): string {
    const key = p.trim().toLowerCase();
    const map: Record<string, string> = {
        project: "pricing.period.project",
        proyek: "pricing.period.project",
        month: "pricing.period.month",
        bulan: "pricing.period.month",
        year: "pricing.period.year",
        tahun: "pricing.period.year",
        hour: "pricing.period.hour",
        jam: "pricing.period.hour",
        "custom quote": "pricing.period.customQuote",
        custom: "pricing.period.customQuote",
    };
    return map[key] ? t(map[key]) : p;
}

function translateCta(
    label: string | undefined,
    t: (k: string) => string,
): string {
    if (!label) return t("nav.hireMe");
    const key = label.trim().toLowerCase();
    const map: Record<string, string> = {
        "start project": "nav.hireMe",
        "get started": "nav.hireMe",
        "discuss project": "about.letsTalk",
        "let's talk": "about.letsTalk",
        "lets talk": "about.letsTalk",
        "hire me": "nav.hireMe",
    };
    return map[key] ? t(map[key]) : label;
}

function PricingCard({
    plan,
    index,
    isId,
    t,
}: {
    plan: PricingPlan;
    index: number;
    isId: boolean;
    t: (k: string) => string;
}) {
    const features =
        (isId && plan.features_id?.length ? plan.features_id : plan.features) ||
        [];
    const price = plan.price
        ? formatCurrency(plan.price, plan.currency || "IDR")
        : t("pricing.custom");

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
        stiffness: 150,
        damping: 16,
    });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
        stiffness: 150,
        damping: 16,
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
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ perspective: 1400 }}
            className={cn("relative", plan.is_popular && "lg:-mt-6")}
        >
            {plan.is_popular && (
                <span className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-4 py-1 text-xs font-bold text-ink-900 shadow-glow">
                    <Sparkles size={12} />
                    {t("pricing.popular")}
                </span>
            )}

            <motion.div
                style={{
                    rotateX: rx,
                    rotateY: ry,
                    transformStyle: "preserve-3d",
                }}
                className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-gradient-to-br p-6 sm:p-8 backdrop-blur-xl transition-shadow duration-500",
                    plan.is_popular
                        ? "border-brand-400/40 from-brand-500/15 to-sun-500/5 shadow-glow-lg"
                        : "border-white/10 from-white/[0.05] to-white/[0.01] hover:shadow-glow",
                )}
            >
                {/* Animated conic border for popular */}
                {plan.is_popular && (
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-px rounded-3xl"
                        style={{
                            background:
                                "conic-gradient(from 0deg, rgba(255,122,26,0.6), rgba(255,209,102,0.4), rgba(255,122,26,0.6), rgba(255,209,102,0.4), rgba(255,122,26,0.6))",
                            WebkitMask:
                                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                            WebkitMaskComposite: "xor" as any,
                            maskComposite: "exclude" as any,
                            padding: 1,
                            animation: "spinSlow 8s linear infinite",
                        }}
                    />
                )}

                {/* Decorative blob */}
                <div
                    aria-hidden
                    className={cn(
                        "pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl",
                        plan.is_popular ? "bg-brand-500/30" : "bg-white/[0.04]",
                    )}
                />

                <div style={{ transform: "translateZ(20px)" }}>
                    <h3 className="font-display text-xl font-semibold text-white">
                        {isId && plan.name_id ? plan.name_id : plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-300">
                        {isId && plan.tagline_id
                            ? plan.tagline_id
                            : plan.tagline}
                    </p>
                    <div className="mt-6 flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                        {plan.price && (
                            <span className="text-xs text-ink-300">
                                {t("pricing.from")}
                            </span>
                        )}
                        <span
                            className={cn(
                                "font-display font-bold text-2xl sm:text-3xl md:text-4xl break-all",
                                plan.is_popular
                                    ? "text-gradient"
                                    : "text-white",
                            )}
                        >
                            {price}
                        </span>
                        {plan.billing_period && (
                            <span className="text-sm text-ink-300">
                                /{translatePeriod(plan.billing_period, t)}
                            </span>
                        )}
                    </div>
                </div>

                <ul className="my-6 flex-1 space-y-3 border-y border-white/10 py-6">
                    {features.map((f, idx) => (
                        <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.35,
                                delay: 0.15 + idx * 0.05,
                            }}
                            className="flex items-start gap-2.5 text-sm text-ink-100"
                        >
                            <span
                                className={cn(
                                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                                    plan.is_popular
                                        ? "bg-brand-gradient text-ink-900"
                                        : "bg-white/10 text-brand-300",
                                )}
                            >
                                <Check size={12} strokeWidth={3} />
                            </span>
                            <span>{f}</span>
                        </motion.li>
                    ))}
                </ul>

                <a
                    href={plan.cta_url || "#contact"}
                    className={cn(
                        "group/cta justify-center",
                        plan.is_popular ? "btn-primary" : "btn-ghost",
                    )}
                >
                    {translateCta(plan.cta_label, t)}
                    <ArrowRight
                        size={16}
                        className="transition-transform group-hover/cta:translate-x-1"
                    />
                </a>
            </motion.div>
        </motion.div>
    );
}

export function Pricing({ plans }: { plans: PricingPlan[] }) {
    const { t, i18n } = useTranslation();
    const isId = i18n.language === "id";
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yOrb1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const yOrb2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

    if (!plans?.length) return null;

    return (
        <Section id="pricing">
            <div ref={ref} className="relative">
                <motion.div
                    style={{ y: yOrb1 }}
                    aria-hidden
                    className="mobile-fx-hide pointer-events-none absolute left-1/3 top-0 h-72 w-72 rounded-full bg-brand-500/10 blur-[140px]"
                />
                <motion.div
                    style={{ y: yOrb2 }}
                    aria-hidden
                    className="mobile-fx-hide pointer-events-none absolute right-10 bottom-0 h-80 w-80 rounded-full bg-sun-500/10 blur-[140px]"
                />

                <SectionHeader
                    eyebrow={t("pricing.eyebrow")}
                    title={t("pricing.title")}
                    subtitle={t("pricing.subtitle")}
                />
                <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {plans.map((p, i) => (
                        <PricingCard
                            key={p.id}
                            plan={p}
                            index={i}
                            isId={isId}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
