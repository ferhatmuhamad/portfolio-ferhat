import PublicLayout from "@/Layouts/PublicLayout";
import { Link, usePage } from "@inertiajs/react";
import { Glass } from "@/Components/ui/Glass";
import { Section } from "@/Components/ui/Section";
import { formatDate } from "@/lib/format";
import { PageProps } from "@/types";
import { Clock } from "lucide-react";

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
        <PublicLayout
            title={title}
            description={excerpt}
            detail={{
                backHref: route("blog.index"),
                backLabel: isID ? "Kembali" : "Back",
                eyebrow: isID ? "Artikel" : "Article",
                title,
                breadcrumbs: [
                    { label: isID ? "Beranda" : "Home", href: "/" },
                    {
                        label: isID ? "Blog" : "Blog",
                        href: route("blog.index"),
                    },
                    { label: title },
                ],
            }}
        >
            <Section className="!pt-16 md:!pt-20">
                <article className="max-w-3xl mx-auto">
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
                    {excerpt && (
                        <p className="mt-4 text-lg leading-relaxed text-ink-200">
                            {excerpt}
                        </p>
                    )}

                    {post.cover_url && (
                        <Glass className="p-0 mt-8 overflow-hidden">
                            <img
                                src={post.cover_url}
                                alt={title}
                                className="object-cover w-full aspect-video"
                            />
                        </Glass>
                    )}

                    {content && (
                        <div className="mt-10 prose whitespace-pre-wrap prose-invert max-w-none text-ink-100">
                            {content}
                        </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-6 mt-10 border-t border-white/10">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="px-3 py-1 text-xs font-medium rounded-md bg-brand-500/10 text-brand-200"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>
                    )}
                </article>

                {related.length > 0 && (
                    <div className="max-w-5xl mx-auto mt-20">
                        <h3 className="mb-6 text-xl font-bold text-white font-display">
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
                                        <Glass className="h-full p-0 overflow-hidden">
                                            {r.cover_url && (
                                                <img
                                                    src={r.cover_url}
                                                    className="object-cover w-full aspect-video"
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
