import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Github } from "lucide-react";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { Glass } from "@/Components/ui/Glass";
import { cn } from "@/lib/cn";

export interface ProjectItem {
    id: number;
    title: string;
    slug: string;
    category?: string;
    summary?: string;
    summary_id?: string;
    cover_url?: string;
    tech_stack?: string[] | null;
    live_url?: string;
    repo_url?: string;
    is_featured?: boolean;
}

export function Projects({ items }: { items: ProjectItem[] }) {
    const { t, i18n } = useTranslation();
    const [filter, setFilter] = useState<string>("all");

    if (!items?.length) return null;

    const cats = Array.from(
        new Set(items.map((p) => (p.category || "other").toLowerCase())),
    );
    const filtered =
        filter === "all"
            ? items
            : items.filter((p) => (p.category || "").toLowerCase() === filter);

    return (
        <Section id="projects">
            <SectionHeader
                eyebrow={t("projects.eyebrow")}
                title={t("projects.title")}
                subtitle={t("projects.subtitle")}
            />

            <div className="mb-10 flex flex-wrap justify-center gap-2">
                <FilterChip
                    active={filter === "all"}
                    onClick={() => setFilter("all")}
                >
                    {t("projects.filter.all")}
                </FilterChip>
                {cats.map((c) => (
                    <FilterChip
                        key={c}
                        active={filter === c}
                        onClick={() => setFilter(c)}
                    >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </FilterChip>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((p, i) => (
                    <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                    >
                        <Glass className="group overflow-hidden p-0">
                            <Link
                                href={route("projects.show", p.slug)}
                                className="block"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-ink-800">
                                    {p.cover_url ? (
                                        <img
                                            src={p.cover_url}
                                            alt={p.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-brand-500/40">
                                            {p.title[0]}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                                    {p.is_featured && (
                                        <span className="absolute left-4 top-4 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-ink-900 shadow-glow">
                                            Featured
                                        </span>
                                    )}
                                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all group-hover:bg-brand-gradient group-hover:text-ink-900">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>
                            </Link>
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        {p.category && (
                                            <span className="text-xs font-mono uppercase tracking-wider text-brand-300">
                                                {p.category}
                                            </span>
                                        )}
                                        <h3 className="mt-1 font-display text-xl font-semibold text-white">
                                            <Link
                                                href={route(
                                                    "projects.show",
                                                    p.slug,
                                                )}
                                                className="hover:text-brand-300"
                                            >
                                                {p.title}
                                            </Link>
                                        </h3>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-ink-200 line-clamp-2">
                                    {i18n.language === "id" && p.summary_id
                                        ? p.summary_id
                                        : p.summary}
                                </p>
                                {p.tech_stack && p.tech_stack.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {p.tech_stack
                                            .slice(0, 5)
                                            .map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-ink-200"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                    </div>
                                )}
                                <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4">
                                    {p.live_url && (
                                        <a
                                            href={p.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-3 py-1.5 text-xs font-semibold text-brand-200 transition-colors hover:bg-brand-500/25"
                                        >
                                            <ArrowUpRight size={12} />
                                            {t("projects.viewLive")}
                                        </a>
                                    )}
                                    {p.repo_url && (
                                        <a
                                            href={p.repo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-ink-100 hover:bg-white/10"
                                        >
                                            <Github size={12} />
                                            {t("projects.viewCode")}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Glass>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}

function FilterChip({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                active
                    ? "border-transparent bg-brand-gradient text-ink-900 shadow-glow"
                    : "border-white/10 bg-white/5 text-ink-100 hover:bg-white/10",
            )}
        >
            {children}
        </button>
    );
}
