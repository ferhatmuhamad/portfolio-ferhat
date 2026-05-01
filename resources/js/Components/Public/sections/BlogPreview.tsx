import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "@inertiajs/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { Glass } from "@/Components/ui/Glass";
import { formatDate } from "@/lib/format";

export interface PostItem {
    id: number;
    title: string;
    title_id?: string;
    slug: string;
    excerpt?: string;
    excerpt_id?: string;
    cover_url?: string;
    published_at?: string;
    reading_minutes?: number;
    tags?: string[] | null;
}

export function BlogPreview({ posts }: { posts: PostItem[] }) {
    const { t, i18n } = useTranslation();
    const isId = i18n.language === "id";
    if (!posts?.length) return null;

    return (
        <Section id="blog">
            <SectionHeader
                eyebrow={t("blog.eyebrow")}
                title={t("blog.title")}
            />
            <div className="grid gap-6 md:grid-cols-3">
                {posts.slice(0, 3).map((p, i) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                        <Glass className="group flex h-full flex-col overflow-hidden p-0">
                            <Link
                                href={route("blog.show", p.slug)}
                                className="block"
                            >
                                <div className="aspect-[16/10] overflow-hidden bg-ink-800">
                                    {p.cover_url ? (
                                        <img
                                            src={p.cover_url}
                                            alt={p.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center font-display text-4xl text-brand-500/40">
                                            {
                                                (isId && p.title_id
                                                    ? p.title_id
                                                    : p.title)[0]
                                            }
                                        </div>
                                    )}
                                </div>
                            </Link>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="flex items-center gap-3 text-xs text-ink-300">
                                    {p.published_at && (
                                        <span className="inline-flex items-center gap-1">
                                            <Calendar size={12} />
                                            {formatDate(
                                                p.published_at,
                                                i18n.language,
                                            )}
                                        </span>
                                    )}
                                    {p.reading_minutes && (
                                        <span className="inline-flex items-center gap-1">
                                            <Clock size={12} />
                                            {p.reading_minutes}{" "}
                                            {t("blog.minRead")}
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-3 font-display text-lg font-semibold text-white line-clamp-2">
                                    <Link
                                        href={route("blog.show", p.slug)}
                                        className="hover:text-brand-300"
                                    >
                                        {isId && p.title_id
                                            ? p.title_id
                                            : p.title}
                                    </Link>
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-200 line-clamp-2">
                                    {isId && p.excerpt_id
                                        ? p.excerpt_id
                                        : p.excerpt}
                                </p>
                                <Link
                                    href={route("blog.show", p.slug)}
                                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-300 hover:text-brand-200"
                                >
                                    {t("blog.readMore")}{" "}
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </Glass>
                    </motion.div>
                ))}
            </div>
            <div className="mt-10 text-center">
                <Link href={route("blog.index")} className="btn-ghost">
                    {t("projects.viewAll")} <ArrowRight size={14} />
                </Link>
            </div>
        </Section>
    );
}
