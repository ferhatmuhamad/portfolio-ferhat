import PublicLayout from "@/Layouts/PublicLayout";
import { Link, usePage } from "@inertiajs/react";
import { Glass } from "@/Components/ui/Glass";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { formatDate } from "@/lib/format";
import { PageProps } from "@/types";
import { ArrowRight, Clock } from "lucide-react";

interface Post {
    id: number;
    title: string;
    title_id?: string;
    slug: string;
    excerpt?: string;
    excerpt_id?: string;
    cover_url?: string;
    published_at: string | null;
    reading_minutes?: number | null;
    tags?: string[] | null;
}
interface Paginator<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function BlogIndex({ posts }: { posts: Paginator<Post> }) {
    const { locale } = usePage<PageProps>().props;
    const isID = locale === "id";

    return (
        <PublicLayout title="Blog">
            <Section className="pt-32">
                <SectionHeader
                    eyebrow="Blog"
                    title={isID ? "Catatan & Wawasan" : "Notes & Insights"}
                    subtitle={
                        isID
                            ? "Tulisan tentang pengembangan web, desain, dan produktivitas."
                            : "Writing on web development, design, and productivity."
                    }
                />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.data.map((p) => {
                        const title = isID && p.title_id ? p.title_id : p.title;
                        const excerpt =
                            isID && p.excerpt_id ? p.excerpt_id : p.excerpt;
                        return (
                            <Link
                                key={p.id}
                                href={route("blog.show", p.slug)}
                                className="group"
                            >
                                <Glass className="flex h-full flex-col overflow-hidden p-0 transition-transform group-hover:-translate-y-1">
                                    {p.cover_url && (
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={p.cover_url}
                                                alt={title}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="flex items-center gap-3 text-xs text-ink-400">
                                            {p.published_at && (
                                                <span>
                                                    {formatDate(
                                                        p.published_at,
                                                        locale,
                                                    )}
                                                </span>
                                            )}
                                            {p.reading_minutes && (
                                                <span className="flex items-center gap-1">
                                                    <Clock size={11} />
                                                    {p.reading_minutes} min
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="mt-3 font-display text-lg font-bold text-white group-hover:text-brand-300">
                                            {title}
                                        </h3>
                                        {excerpt && (
                                            <p className="mt-2 line-clamp-3 text-sm text-ink-300">
                                                {excerpt}
                                            </p>
                                        )}
                                        <span className="mt-auto pt-4 text-sm font-semibold text-brand-300 inline-flex items-center gap-1">
                                            {isID ? "Baca" : "Read"}{" "}
                                            <ArrowRight
                                                size={13}
                                                className="transition-transform group-hover:translate-x-1"
                                            />
                                        </span>
                                    </div>
                                </Glass>
                            </Link>
                        );
                    })}
                </div>

                {posts.links.length > 3 && (
                    <div className="mt-12 flex flex-wrap justify-center gap-2">
                        {posts.links.map((l, i) =>
                            l.url ? (
                                <Link
                                    key={i}
                                    href={l.url}
                                    preserveScroll
                                    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${l.active ? "border-brand-500 bg-brand-500/15 text-brand-300" : "border-white/10 text-ink-300 hover:bg-white/5"}`}
                                    dangerouslySetInnerHTML={{
                                        __html: l.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={i}
                                    className="rounded-lg border border-white/5 px-4 py-2 text-sm text-ink-500"
                                    dangerouslySetInnerHTML={{
                                        __html: l.label,
                                    }}
                                />
                            ),
                        )}
                    </div>
                )}
            </Section>
        </PublicLayout>
    );
}
