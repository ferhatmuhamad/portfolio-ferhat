import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    Award,
    Download,
    GraduationCap,
    BookOpen,
    ExternalLink,
    Calendar,
} from "lucide-react";
import { useRef } from "react";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { formatDateRange, formatDate } from "@/lib/format";

export interface EducationItem {
    id: number;
    institution: string;
    degree: string;
    start_date: string;
    end_date: string | null;
    description?: string;
    description_id?: string;
}

export interface CertificationItem {
    id: number;
    title: string;
    issuer: string;
    issued_at: string;
    credential_url?: string;
    image_url?: string;
    file_url?: string;
}

export function EducationSection({
    educations,
    certifications,
}: {
    educations: EducationItem[];
    certifications: CertificationItem[];
}) {
    const { t, i18n } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yOrb1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const yOrb2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const lineH = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

    if (!educations?.length && !certifications?.length) return null;

    return (
        <Section id="education">
            <div ref={ref} className="relative">
                <motion.div
                    style={{ y: yOrb1 }}
                    aria-hidden
                    className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[140px]"
                />
                <motion.div
                    style={{ y: yOrb2 }}
                    aria-hidden
                    className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-brand-500/10 blur-[140px]"
                />

                <SectionHeader
                    eyebrow={t("education.eyebrow")}
                    title={t("education.title")}
                />

                <div className="grid gap-12 lg:grid-cols-12">
                    {/* Educations — left, big */}
                    {educations?.length > 0 && (
                        <div className="lg:col-span-7">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-ink-900 shadow-glow">
                                    <BookOpen size={20} />
                                </span>
                                <h3 className="font-display text-2xl font-semibold text-white">
                                    {t("education.title")}
                                </h3>
                            </div>

                            {/* Vertical rail */}
                            <div className="relative pl-8">
                                <div className="absolute left-3 top-2 h-full w-px bg-white/10" />
                                <motion.div
                                    style={{ height: lineH }}
                                    className="absolute left-3 top-2 w-px bg-gradient-to-b from-brand-400 via-sun-400 to-brand-600"
                                />

                                <div className="space-y-6">
                                    {educations.map((e, i) => (
                                        <motion.div
                                            key={e.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{
                                                once: true,
                                                margin: "-50px",
                                            }}
                                            transition={{
                                                duration: 0.55,
                                                delay: i * 0.1,
                                            }}
                                            className="relative"
                                        >
                                            {/* Dot */}
                                            <span className="absolute -left-[1.45rem] top-2 flex h-5 w-5 items-center justify-center">
                                                <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-brand-400/40" />
                                                <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-gradient shadow-glow" />
                                            </span>

                                            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-brand-400/30 hover:shadow-glow">
                                                <div
                                                    aria-hidden
                                                    className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-brand-500/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                                />
                                                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-300">
                                                    <Calendar size={12} />
                                                    {formatDateRange(
                                                        e.start_date,
                                                        e.end_date,
                                                        i18n.language,
                                                    )}
                                                </div>
                                                <h4 className="mt-3 font-display text-xl font-semibold text-white">
                                                    {e.institution}
                                                </h4>
                                                {e.degree && (
                                                    <p className="mt-1 inline-flex items-center gap-2 text-sm text-ink-100">
                                                        <GraduationCap
                                                            size={14}
                                                            className="text-brand-300"
                                                        />
                                                        {e.degree}
                                                    </p>
                                                )}
                                                {(() => {
                                                    const desc =
                                                        i18n.language ===
                                                            "id" &&
                                                        e.description_id
                                                            ? e.description_id
                                                            : e.description;
                                                    return desc ? (
                                                        <p className="mt-3 text-sm leading-relaxed text-ink-200">
                                                            {desc}
                                                        </p>
                                                    ) : null;
                                                })()}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Certifications — right */}
                    {certifications?.length > 0 && (
                        <div className="lg:col-span-5">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-brand-300 backdrop-blur-md">
                                    <Award size={20} />
                                </span>
                                <h3 className="font-display text-2xl font-semibold text-white">
                                    {t("certifications.title")}
                                </h3>
                            </div>

                            <div className="space-y-3">
                                {certifications.map((c, i) => (
                                    <motion.div
                                        key={c.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{
                                            once: true,
                                            margin: "-50px",
                                        }}
                                        transition={{
                                            duration: 0.45,
                                            delay: i * 0.06,
                                        }}
                                        whileHover={{ x: 4 }}
                                        className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all hover:border-brand-400/40"
                                    >
                                        <div
                                            aria-hidden
                                            className="absolute inset-y-0 left-0 w-1 bg-brand-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        />
                                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-ink-900/60">
                                            {c.image_url ? (
                                                <img
                                                    src={c.image_url}
                                                    alt={c.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Award
                                                    size={20}
                                                    className="text-brand-300"
                                                />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-semibold text-white">
                                                {c.title}
                                            </p>
                                            <p className="truncate text-xs text-ink-300">
                                                {c.issuer} ·{" "}
                                                {formatDate(
                                                    c.issued_at,
                                                    i18n.language,
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-1.5">
                                            {c.file_url && (
                                                <a
                                                    href={c.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title={t(
                                                        "certifications.download",
                                                    )}
                                                    className="inline-flex h-9 items-center gap-1 rounded-full border border-brand-400/30 bg-brand-500/10 px-3 text-xs font-medium text-brand-200 transition-all hover:bg-brand-500/20 hover:text-white"
                                                >
                                                    <Download size={12} />
                                                    <span className="hidden sm:inline">
                                                        {t(
                                                            "certifications.download",
                                                        )}
                                                    </span>
                                                </a>
                                            )}
                                            {c.credential_url && (
                                                <a
                                                    href={c.credential_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    title="View credential"
                                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-colors hover:border-brand-400/40 hover:text-brand-300"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}
