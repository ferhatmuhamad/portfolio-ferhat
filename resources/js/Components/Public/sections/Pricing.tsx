import {
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";

// Approximate IDR -> USD conversion that snaps up to a "clean" psychological
// price. The result is intentionally a touch higher than a direct conversion
// (so USD pricing is never undersold).
function idrToUsd(idr: number): number {
    const raw = idr / 14000;
    const tiers = [
        49, 79, 99, 149, 199, 249, 299, 349, 399, 449, 499, 599, 699, 799, 899,
        999, 1199, 1499, 1799, 1999, 2499, 2999, 3999, 4999, 5999, 7999, 9999,
    ];
    for (const tier of tiers) if (tier >= raw) return tier;
    // Beyond the table: round up to the next .999 increment of 1000
    return Math.ceil(raw / 1000) * 1000 - 1;
}

function displayPrice(
    plan: PricingPlan,
    currency: "IDR" | "USD",
    locale: string,
): string | null {
    if (plan.price == null) return null;
    const baseCurrency = (plan.currency || "IDR").toUpperCase();
    if (currency === "USD") {
        // Honor an explicit USD override when provided (used for synthetic
        // plans that need a curated USD price rather than a conversion).
        if (typeof plan.price_usd === "number") {
            return formatCurrency(plan.price_usd, "USD", "en-US");
        }
        // Treat any non-USD source as IDR for conversion purposes.
        const usd = baseCurrency === "USD" ? plan.price : idrToUsd(plan.price);
        return formatCurrency(usd, "USD", "en-US");
    }
    // IDR view
    if (baseCurrency === "USD") {
        // Reverse-approximate (rare): assume the row is USD; scale up to IDR.
        return formatCurrency(plan.price * 14000, "IDR", "id-ID");
    }
    return formatCurrency(plan.price, "IDR", locale);
}

export interface PricingPlan {
    id: number;
    name: string;
    name_id?: string;
    tagline?: string;
    tagline_id?: string;
    price: number | null;
    price_usd?: number;
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
    currency,
    t,
}: {
    plan: PricingPlan;
    index: number;
    isId: boolean;
    currency: "IDR" | "USD";
    t: (k: string) => string;
}) {
    const features =
        (isId && plan.features_id?.length ? plan.features_id : plan.features) ||
        [];
    const price =
        displayPrice(plan, currency, isId ? "id-ID" : "en-US") ||
        t("pricing.custom");

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

    // Categorize by billing_period: "hour"/"jam" goes to the Hour tab,
    // everything else (project / month / year / custom / null) is Project.
    const isHourPlan = (p: PricingPlan) => {
        const bp = (p.billing_period || "").trim().toLowerCase();
        return bp === "hour" || bp === "jam";
    };
    const projectPlans = useMemo(
        () => plans?.filter((p) => !isHourPlan(p)) || [],
        [plans],
    );

    // Hour tab: use admin-managed plans (billing_period = "hour" or "jam")
    // when present. Falls back to a curated default pair (Hourly + Custom)
    // so the section is never empty before the admin sets things up.
    const hourPlansFromDb = useMemo(
        () => plans?.filter(isHourPlan) || [],
        [plans],
    );
    const defaultHourPlans: PricingPlan[] = useMemo(
        () => [
            {
                id: -1,
                name: "Hourly",
                name_id: "Per Jam",
                tagline:
                    "Flexible hourly engagement for tweaks, audits, bug fixes, and ad-hoc improvements on existing projects.",
                tagline_id:
                    "Engagement per jam yang fleksibel untuk perbaikan, audit, bug fix, dan peningkatan kecil pada project yang sudah berjalan.",
                price: 150000,
                price_usd: 15,
                currency: "IDR",
                billing_period: "hour",
                features: [
                    "Minimum 2 hours per session",
                    "Live tracking and weekly summary",
                    "Code commits & screen recordings on request",
                    "Priority response within 24 hours",
                ],
                features_id: [
                    "Minimum 2 jam per sesi",
                    "Tracking langsung & ringkasan mingguan",
                    "Kirim commit & rekaman layar bila diminta",
                    "Respon prioritas dalam 24 jam",
                ],
                is_popular: true,
                cta_label: "Hire Me",
            },
            {
                id: -2,
                name: "Custom",
                name_id: "Khusus",
                tagline:
                    "Have a different scope, longer retainer, or special arrangement? Tell me what you need and we'll design a fair quote.",
                tagline_id:
                    "Punya scope berbeda, retainer panjang, atau kerja sama khusus? Ceritakan kebutuhanmu dan kita susun penawaran yang sesuai.",
                price: null,
                currency: "IDR",
                billing_period: "custom",
                features: [
                    "Tailored to your project scope",
                    "Discounted bundle for 20+ hours",
                    "Dedicated communication channel",
                    "Flexible payment milestones",
                ],
                features_id: [
                    "Disesuaikan dengan kebutuhan project",
                    "Diskon paket untuk 20+ jam",
                    "Channel komunikasi khusus",
                    "Pembayaran fleksibel per milestone",
                ],
                cta_label: "Let's Talk",
            },
        ],
        [],
    );
    const hourPlans = hourPlansFromDb.length
        ? hourPlansFromDb
        : defaultHourPlans;

    const [tab, setTab] = useState<"project" | "hour">(
        projectPlans.length ? "project" : "hour",
    );
    const [currency, setCurrency] = useState<"IDR" | "USD">("IDR");

    if (!plans?.length) return null;

    const visiblePlans = tab === "project" ? projectPlans : hourPlans;

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

                {/* Controls: type tab + currency toggle */}
                <div className="mb-14 md:mb-20 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    {/* Type tab */}
                    <div
                        role="tablist"
                        aria-label="Pricing type"
                        className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
                    >
                        {(["project", "hour"] as const).map((key) => {
                            const active = tab === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setTab(key)}
                                    className={cn(
                                        "relative rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                                        active
                                            ? "text-ink-900"
                                            : "text-ink-200 hover:text-white",
                                    )}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="pricing-tab-pill"
                                            className="absolute inset-0 -z-0 rounded-full bg-brand-gradient shadow-glow"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">
                                        {t(`pricing.tabs.${key}`)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Currency toggle */}
                    <div
                        role="group"
                        aria-label="Currency"
                        className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
                    >
                        {(["IDR", "USD"] as const).map((c) => {
                            const active = currency === c;
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setCurrency(c)}
                                    aria-pressed={active}
                                    className={cn(
                                        "relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
                                        active
                                            ? "text-ink-900"
                                            : "text-ink-200 hover:text-white",
                                    )}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="pricing-currency-pill"
                                            className="absolute inset-0 -z-0 rounded-full bg-white shadow"
                                            transition={{
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">{c}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {visiblePlans.length > 0 ? (
                    <div
                        key={tab + currency}
                        className={cn(
                            "mx-auto grid grid-cols-1 items-stretch gap-6",
                            tab === "hour"
                                ? visiblePlans.length === 1
                                    ? "max-w-md"
                                    : visiblePlans.length === 2
                                      ? "max-w-4xl md:grid-cols-2"
                                      : "sm:grid-cols-2 lg:grid-cols-3"
                                : "sm:grid-cols-2 lg:grid-cols-3",
                        )}
                    >
                        {visiblePlans.map((p, i) => (
                            <PricingCard
                                key={p.id}
                                plan={p}
                                index={i}
                                isId={isId}
                                currency={currency}
                                t={t}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center text-sm text-ink-300 backdrop-blur-md">
                        {t(`pricing.empty.${tab}`)}
                    </div>
                )}
            </div>
        </Section>
    );
}
