import PublicLayout from "@/Layouts/PublicLayout";
import { Link, usePage } from "@inertiajs/react";
import { Glass } from "@/Components/ui/Glass";
import { Lightbox } from "@/Components/ui/Lightbox";
import { ExternalLink, Github, Calendar, ZoomIn } from "lucide-react";
import { PageProps } from "@/types";
import { formatDate } from "@/lib/format";
import { useState, useMemo } from "react";

interface Project {
    id: number;
    title: string;
    slug: string;
    category: string;
    client?: string;
    summary: string;
    summary_id?: string;
    content?: string;
    content_id?: string;
    tech_stack?: string[] | null;
    live_url?: string;
    repo_url?: string;
    completed_at?: string | null;
    cover_url?: string;
    gallery_urls?: string[];
}

export default function ProjectShow({
    project,
    related,
}: {
    project: Project;
    related: Project[];
}) {
    const { locale } = usePage<PageProps>().props;
    const isID = locale === "id";
    const summary =
        isID && project.summary_id ? project.summary_id : project.summary;
    const content =
        isID && project.content_id ? project.content_id : project.content;

    // Cover + gallery as a single navigable list inside the lightbox
    const lightboxImages = useMemo<string[]>(() => {
        const arr: string[] = [];
        if (project.cover_url) arr.push(project.cover_url);
        if (project.gallery_urls?.length) arr.push(...project.gallery_urls);
        return arr;
    }, [project.cover_url, project.gallery_urls]);

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <PublicLayout
            title={project.title}
            description={summary}
            detail={{
                backHref: route("home") + "#projects",
                backLabel: isID ? "Kembali" : "Back",
                eyebrow: project.category,
                title: project.title,
                breadcrumbs: [
                    { label: isID ? "Beranda" : "Home", href: "/" },
                    {
                        label: isID ? "Proyek" : "Projects",
                        href: route("home") + "#projects",
                    },
                    { label: project.title },
                ],
            }}
        >
            <section className="relative pb-24 md:pb-32">
                <div className="container">
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            {project.cover_url && (
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(0)}
                                    aria-label="Open cover image"
                                    className="group block w-full"
                                >
                                    <Glass className="relative overflow-hidden p-0">
                                        <img
                                            src={project.cover_url}
                                            alt={project.title}
                                            className="aspect-[1448/1086] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                        />
                                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all group-hover:bg-ink-950/40 group-hover:opacity-100">
                                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                                                <ZoomIn size={14} />
                                                {isID ? "Lihat" : "Preview"}
                                            </span>
                                        </span>
                                    </Glass>
                                </button>
                            )}

                            <div className="mt-8">
                                <p className="text-lg leading-relaxed text-ink-200">
                                    {summary}
                                </p>

                                {content && (
                                    <div className="prose prose-invert mt-8 max-w-none whitespace-pre-wrap text-ink-100">
                                        {content}
                                    </div>
                                )}

                                {project.gallery_urls &&
                                    project.gallery_urls.length > 0 && (
                                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {project.gallery_urls.map(
                                                (src, i) => {
                                                    // Cover takes index 0, so gallery starts at 1
                                                    const lbIndex =
                                                        (project.cover_url
                                                            ? 1
                                                            : 0) + i;
                                                    return (
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            onClick={() =>
                                                                setOpenIndex(
                                                                    lbIndex,
                                                                )
                                                            }
                                                            aria-label={`Open gallery image ${i + 1}`}
                                                            className="group block"
                                                        >
                                                            <Glass className="relative overflow-hidden p-0">
                                                                <img
                                                                    src={src}
                                                                    alt=""
                                                                    className="aspect-[1448/1086] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                                />
                                                                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-950/0 opacity-0 transition-all group-hover:bg-ink-950/40 group-hover:opacity-100">
                                                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                                                                        <ZoomIn
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                        {isID
                                                                            ? "Lihat"
                                                                            : "Preview"}
                                                                    </span>
                                                                </span>
                                                            </Glass>
                                                        </button>
                                                    );
                                                },
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>

                        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                            <Glass className="space-y-4 p-6">
                                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-400">
                                    Project Info
                                </h3>
                                {project.client && (
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-ink-400">
                                            Client
                                        </p>
                                        <p className="font-semibold text-white">
                                            {project.client}
                                        </p>
                                    </div>
                                )}
                                {project.completed_at && (
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-ink-400">
                                            Completed
                                        </p>
                                        <p className="flex items-center gap-2 font-semibold text-white">
                                            <Calendar size={14} />
                                            {formatDate(project.completed_at)}
                                        </p>
                                    </div>
                                )}
                                {project.tech_stack &&
                                    project.tech_stack.length > 0 && (
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-ink-400">
                                                Tech Stack
                                            </p>
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                {project.tech_stack.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-md bg-brand-500/10 px-2 py-1 text-xs font-medium text-brand-200"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                <div className="flex flex-col gap-2 pt-2">
                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-primary justify-center text-sm"
                                        >
                                            Live Site
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                    {project.repo_url && (
                                        <a
                                            href={project.repo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-ghost justify-center text-sm"
                                        >
                                            Source Code
                                            <Github size={14} />
                                        </a>
                                    )}
                                </div>
                            </Glass>

                            {related.length > 0 && (
                                <Glass className="space-y-3 p-6">
                                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-400">
                                        Related
                                    </h3>
                                    {related.map((r) => (
                                        <Link
                                            key={r.id}
                                            href={route(
                                                "projects.show",
                                                r.slug,
                                            )}
                                            className="group flex gap-3"
                                        >
                                            {r.cover_url && (
                                                <img
                                                    src={r.cover_url}
                                                    className="h-14 w-20 shrink-0 rounded-lg border border-white/10 object-cover"
                                                />
                                            )}
                                            <div>
                                                <p className="text-xs text-brand-400">
                                                    {r.category}
                                                </p>
                                                <p className="text-sm font-semibold text-white group-hover:text-brand-300">
                                                    {r.title}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </Glass>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

            <Lightbox
                images={lightboxImages}
                openIndex={openIndex}
                onClose={() => setOpenIndex(null)}
                onChange={setOpenIndex}
            />
        </PublicLayout>
    );
}
