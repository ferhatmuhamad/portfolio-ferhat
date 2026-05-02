import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Quote, Star, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Section, SectionHeader } from "@/Components/ui/Section";

export interface TestimonialItem {
    id: number;
    name: string;
    role?: string;
    company?: string;
    quote: string;
    quote_id?: string;
    avatar_url?: string;
    rating?: number;
}

const accents = [
    "from-brand-500/30 via-brand-500/10 to-transparent",
    "from-sun-400/25 via-sun-400/10 to-transparent",
    "from-fuchsia-500/25 via-fuchsia-500/10 to-transparent",
    "from-sky-500/25 via-sky-500/10 to-transparent",
    "from-emerald-500/25 via-emerald-500/10 to-transparent",
    "from-rose-500/25 via-rose-500/10 to-transparent",
];

export function Testimonials({ items }: { items: TestimonialItem[] }) {
    const { t, i18n } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yOrb1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const yOrb2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

    if (!items?.length) return null;

    return (
        <Section id="testimonials">
            <div ref={ref} className="relative">
                <motion.div
                    style={{ y: yOrb1 }}
                    aria-hidden
                    className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-brand-500/15 blur-[140px]"
                />
                <motion.div
                    style={{ y: yOrb2 }}
                    aria-hidden
                    className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-sun-500/10 blur-[140px]"
                />

                <Quote
                    aria-hidden
                    className="pointer-events-none absolute right-6 top-0 hidden h-40 w-40 text-white/[0.03] md:block"
                />

                <SectionHeader
                    eyebrow={t("testimonials.eyebrow")}
                    title={t("testimonials.title")}
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((tt, i) => (
                        <motion.div
                            key={tt.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.55, delay: i * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="group relative"
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -inset-[1px] -z-10 rounded-[1.6rem] opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
                                style={{
                                    background:
                                        "conic-gradient(from 180deg, rgba(255,122,26,0.5), rgba(255,209,102,0.4), rgba(255,122,26,0.5))",
                                }}
                            />
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-ink-900/80 to-ink-950/80 p-7 backdrop-blur-xl shadow-glass-lg transition-colors group-hover:border-brand-400/40">
                                <div
                                    aria-hidden
                                    className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${
                                        accents[i % accents.length]
                                    } blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                                />

                                <div className="flex items-start justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] text-brand-300 shadow-inner backdrop-blur-md">
                                        <Quote size={18} />
                                    </div>
                                    {(tt.rating || 0) > 0 && (
                                        <div className="flex gap-0.5 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 backdrop-blur-md">
                                            {Array.from({ length: 5 }).map(
                                                (_, idx) => (
                                                    <Star
                                                        key={idx}
                                                        size={12}
                                                        className={
                                                            idx <
                                                            (tt.rating || 0)
                                                                ? "fill-sun-400 text-sun-400"
                                                                : "text-ink-700"
                                                        }
                                                    />
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>

                                <p className="mt-5 flex-1 text-base leading-relaxed text-ink-100">
                                    &ldquo;
                                    {i18n.language === "id" && tt.quote_id
                                        ? tt.quote_id
                                        : tt.quote}
                                    &rdquo;
                                </p>

                                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                                    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-brand-gradient text-sm font-bold text-ink-900 shadow-glow">
                                        {tt.avatar_url ? (
                                            <img
                                                src={tt.avatar_url}
                                                alt={tt.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            tt.name[0]
                                        )}
                                        <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-sun-300" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-white">
                                            {tt.name}
                                        </p>
                                        <p className="truncate text-xs text-ink-300">
                                            {[tt.role, tt.company]
                                                .filter(Boolean)
                                                .join(" · ")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
