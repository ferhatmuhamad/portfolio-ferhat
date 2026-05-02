import {
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/Components/ui/Section";
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

function ProjectCard({
    project: p,
    index,
    isId,
    isLarge,
    t,
}: {
    project: ProjectItem;
    index: number;
    isId: boolean;
    isLarge: boolean;
    t: (k: string) => string;
}) {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
        stiffness: 150,
        damping: 16,
    });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), {
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
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ perspective: 1400 }}
            className={cn(
                "group relative",
                isLarge && "md:col-span-2 lg:row-span-2",
            )}
        >
            <motion.div
                style={{
                    rotateX: rx,
                    rotateY: ry,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl transition-shadow duration-500 hover:shadow-glow-lg"
            >
                {/* Animated border on hover */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background:
                            "conic-gradient(from 180deg at 50% 50%, rgba(255,122,26,0.4), rgba(255,209,102,0.2), rgba(255,122,26,0.4))",
                        WebkitMask:
                            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor" as any,
                        maskComposite: "exclude" as any,
                        padding: 1,
                    }}
                />

                <Link href={route("projects.show", p.slug)} className="block">
                    <div
                        className={cn(
                            "relative overflow-hidden bg-ink-900",
                            isLarge ? "aspect-[16/10]" : "aspect-[16/10]",
                        )}
                    >
                        {p.cover_url ? (
                            <motion.img
                                src={p.cover_url}
                                alt={p.title}
                                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center font-display text-7xl font-bold text-brand-500/30">
                                {p.title[0]}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

                        {/* Floating reflective shimmer on hover */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100"
                        />

                        {p.is_featured && (
                            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold text-ink-900 shadow-glow">
                                <Sparkles size={11} />
                                {t("projects.featured")}
                            </span>
                        )}
                        {p.category && (
                            <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-ink-950/60 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                                {p.category}
                            </span>
                        )}
                        <div className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink-950/60 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-ink-900 group-hover:shadow-glow group-hover:rotate-45">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                </Link>

                <div className="p-6" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                        <Link
                            href={route("projects.show", p.slug)}
                            className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 hover:bg-[length:100%_2px] hover:from-brand-300 hover:to-sun-400"
                        >
                            {p.title}
                        </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-200 line-clamp-2">
                        {isId && p.summary_id ? p.summary_id : p.summary}
                    </p>
                    {p.tech_stack && p.tech_stack.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {p.tech_stack.slice(0, 5).map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-mono text-ink-100"
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
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-ink-100 hover:bg-white/10"
                            >
                                <Github size={12} />
                                {t("projects.viewCode")}
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Projects({ items }: { items: ProjectItem[] }) {
    const { t, i18n } = useTranslation();
    const [filter, setFilter] = useState<string>("all");
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yOrb = useTransform(scrollYProgress, [0, 1], [-80, 80]);

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
            <div ref={ref} className="relative">
                <motion.div
                    style={{ y: yOrb }}
                    aria-hidden
                    className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-brand-500/10 blur-[140px]"
                />
                <motion.div
                    style={{ y: yOrb }}
                    aria-hidden
                    className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-sun-500/10 blur-[140px]"
                />

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

                <motion.div
                    layout
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr"
                >
                    {filtered.map((p, i) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                            index={i}
                            isId={i18n.language === "id"}
                            isLarge={i === 0 && p.is_featured === true}
                            t={t}
                        />
                    ))}
                </motion.div>
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
                "relative rounded-full border px-5 py-2 text-sm font-medium transition-all",
                active
                    ? "border-transparent bg-brand-gradient text-ink-900 shadow-glow"
                    : "border-white/10 bg-white/[0.04] text-ink-100 hover:border-white/25 hover:bg-white/10",
            )}
        >
            {children}
        </button>
    );
}
