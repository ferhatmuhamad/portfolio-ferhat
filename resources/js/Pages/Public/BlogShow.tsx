import PublicLayout from "@/Layouts/PublicLayout";
import { Link, usePage } from "@inertiajs/react";
import { Glass } from "@/Components/ui/Glass";
import { Section } from "@/Components/ui/Section";
import { formatDate } from "@/lib/format";
import { PageProps } from "@/types";
import { ArrowLeft, Clock } from "lucide-react";

interface Post {
    id: number;
    title: string;
    title_id?: string;
    slug: string;
    excerpt?: string;
    excerpt_id?: string;
    content?: string;
    content_id?: string;
    cover_url?: string;
    published_at: string | null;
    reading_minutes?: number | null;
    tags?: string[] | null;
}

export default function BlogShow({
    post,
    related,
}: {
    post: Post;
    related: Post[];
}) {
    const { locale } = usePage<PageProps>().props;
    const isID = locale === "id";
    const title = isID && post.title_id ? post.title_id : post.title;
    const excerpt = isID && post.excerpt_id ? post.excerpt_id : post.excerpt;
    const content = isID && post.content_id ? post.content_id : post.content;

    return (
        <PublicLayout title={title} description={excerpt}>
            <Section className="pt-32">
                <Link
                    href={route("blog.index")}
                    className="mb-8 inline-flex items-center gap-2 text-sm text-ink-300 hover:text-brand-300"
                >
                    <ArrowLeft size={14} />
                    Back to blog
                </Link>

                <article className="mx-auto max-w-3xl">
                    <div className="flex items-center gap-3 text-xs text-ink-400">
                        {post.published_at && (
                            <span>{formatDate(post.published_at, locale)}</span>
                        )}
                        {post.reading_minutes && (
                            <span className="flex items-center gap-1">
                                <Clock size={11} />
                                {post.reading_minutes} min read
                            </span>
                        )}
                    </div>
                    <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
                        {title}
                    </h1>
                    {excerpt && (
                        <p className="mt-4 text-lg leading-relaxed text-ink-200">
                            {excerpt}
                        </p>
                    )}

                    {post.cover_url && (
                        <Glass className="mt-8 overflow-hidden p-0">
                            <img
                                src={post.cover_url}
                                alt={title}
                                className="aspect-video w-full object-cover"
                            />
                        </Glass>
                    )}

                    {content && (
                        <div className="prose prose-invert mt-10 max-w-none whitespace-pre-wrap text-ink-100">
                            {content}
                        </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-md bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-200"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>
                    )}
                </article>

                {related.length > 0 && (
                    <div className="mx-auto mt-20 max-w-5xl">
                        <h3 className="mb-6 font-display text-xl font-bold text-white">
                            {isID ? "Tulisan terkait" : "Related posts"}
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {related.map((r) => {
                                const rTitle =
                                    isID && r.title_id ? r.title_id : r.title;
                                return (
                                    <Link
                                        key={r.id}
                                        href={route("blog.show", r.slug)}
                                        className="group"
                                    >
                                        <Glass className="h-full overflow-hidden p-0">
                                            {r.cover_url && (
                                                <img
                                                    src={r.cover_url}
                                                    className="aspect-video w-full object-cover"
                                                />
                                            )}
                                            <div className="p-4">
                                                <p className="font-semibold text-white group-hover:text-brand-300">
                                                    {rTitle}
                                                </p>
                                            </div>
                                        </Glass>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </Section>
        </PublicLayout>
    );
}
