import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Quote, Star } from "lucide-react";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { Glass } from "@/Components/ui/Glass";

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

export function Testimonials({ items }: { items: TestimonialItem[] }) {
    const { t, i18n } = useTranslation();
    if (!items?.length) return null;

    return (
        <Section id="testimonials">
            <SectionHeader
                eyebrow={t("testimonials.eyebrow")}
                title={t("testimonials.title")}
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {items.map((tt, i) => (
                    <motion.div
                        key={tt.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                        <Glass className="flex h-full flex-col p-7">
                            <Quote className="h-8 w-8 text-brand-400/50" />
                            <p className="mt-4 flex-1 text-base leading-relaxed text-ink-100">
                                "
                                {i18n.language === "id" && tt.quote_id
                                    ? tt.quote_id
                                    : tt.quote}
                                "
                            </p>
                            {(tt.rating || 0) > 0 && (
                                <div className="mt-4 flex gap-0.5">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star
                                            key={idx}
                                            size={14}
                                            className={
                                                idx < (tt.rating || 0)
                                                    ? "fill-sun-400 text-sun-400"
                                                    : "text-ink-700"
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-5">
                                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-brand-gradient text-sm font-bold text-ink-900">
                                    {tt.avatar_url ? (
                                        <img
                                            src={tt.avatar_url}
                                            alt={tt.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        tt.name[0]
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">
                                        {tt.name}
                                    </p>
                                    <p className="text-xs text-ink-300">
                                        {[tt.role, tt.company]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </p>
                                </div>
                            </div>
                        </Glass>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
