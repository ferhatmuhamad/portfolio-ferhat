import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Award, GraduationCap } from "lucide-react";
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
}

export function EducationSection({
    educations,
    certifications,
}: {
    educations: EducationItem[];
    certifications: CertificationItem[];
}) {
    const { t, i18n } = useTranslation();

    if (!educations?.length && !certifications?.length) return null;

    return (
        <Section id="education" light>
            <div className="grid gap-12 lg:grid-cols-2">
                {educations?.length > 0 && (
                    <div>
                        <SectionHeader
                            eyebrow={t("education.eyebrow")}
                            title={t("education.title")}
                            light
                            align="left"
                        />
                        <div className="space-y-5">
                            {educations.map((e, i) => (
                                <motion.div
                                    key={e.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.07,
                                    }}
                                    className="rounded-2xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm"
                                >
                                    <div className="flex items-center gap-3 text-xs font-mono text-ink-700">
                                        <GraduationCap
                                            size={16}
                                            className="text-brand-600"
                                        />
                                        {formatDateRange(
                                            e.start_date,
                                            e.end_date,
                                            i18n.language,
                                        )}
                                    </div>
                                    <h3 className="mt-3 font-display text-xl font-semibold text-ink-900">
                                        {e.institution}
                                    </h3>
                                    {e.degree && (
                                        <p className="mt-1 text-sm font-medium text-ink-700">
                                            {e.degree}
                                        </p>
                                    )}
                                    {(() => {
                                        const desc =
                                            i18n.language === "id" &&
                                            e.description_id
                                                ? e.description_id
                                                : e.description;
                                        return desc ? (
                                            <p className="mt-3 text-sm leading-relaxed text-ink-700">
                                                {desc}
                                            </p>
                                        ) : null;
                                    })()}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {certifications?.length > 0 && (
                    <div>
                        <SectionHeader
                            eyebrow={t("certifications.eyebrow")}
                            title={t("certifications.title")}
                            light
                            align="left"
                        />
                        <div className="space-y-3">
                            {certifications.map((c, i) => (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: i * 0.05,
                                    }}
                                    className="group flex items-center gap-4 rounded-2xl border border-ink-900/10 bg-cream-50 p-4 transition-all hover:border-brand-500/40 hover:shadow-md"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                                        <Award size={22} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-ink-900">
                                            {c.title}
                                        </p>
                                        <p className="text-xs text-ink-700">
                                            {c.issuer} ·{" "}
                                            {formatDate(
                                                c.issued_at,
                                                i18n.language,
                                            )}
                                        </p>
                                    </div>
                                    {c.credential_url && (
                                        <a
                                            href={c.credential_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                                        >
                                            View →
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
}
