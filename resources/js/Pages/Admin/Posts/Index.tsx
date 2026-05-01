import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";
import { formatDate } from "@/lib/format";

interface Post {
    id: number;
    title: string;
    slug: string;
    cover_url?: string;
    is_published: boolean;
    published_at: string | null;
}

export default function PostsIndex({ posts }: { posts: Post[] }) {
    return (
        <AdminLayout
            title="Blog Posts"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Posts" },
            ]}
        >
            <DataTable
                data={posts}
                createHref={route("admin.posts.create")}
                createLabel="New Post"
                editHref={(r) => route("admin.posts.edit", r.id)}
                deleteHref={(r) => route("admin.posts.destroy", r.id)}
                columns={[
                    {
                        header: "Title",
                        cell: (r) => (
                            <div className="flex items-center gap-3">
                                {r.cover_url ? (
                                    <img
                                        src={r.cover_url}
                                        className="h-10 w-14 rounded-lg border border-white/10 object-cover"
                                    />
                                ) : (
                                    <div className="h-10 w-14 rounded-lg bg-brand-500/10" />
                                )}
                                <div>
                                    <p className="font-semibold text-white">
                                        {r.title}
                                    </p>
                                    <p className="text-xs font-mono text-ink-300">
                                        /{r.slug}
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                    {
                        header: "Status",
                        cell: (r) =>
                            r.is_published ? (
                                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                                    PUBLISHED
                                </span>
                            ) : (
                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-ink-300">
                                    DRAFT
                                </span>
                            ),
                    },
                    {
                        header: "Published",
                        cell: (r) => (
                            <span className="text-xs font-mono text-ink-300">
                                {r.published_at
                                    ? formatDate(r.published_at)
                                    : "—"}
                            </span>
                        ),
                    },
                ]}
            />
        </AdminLayout>
    );
}
