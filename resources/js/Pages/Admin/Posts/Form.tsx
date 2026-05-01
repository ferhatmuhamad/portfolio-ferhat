import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import {
    Field,
    FormCard,
    Input,
    Textarea,
    Checkbox,
} from "@/Components/admin/Form";
import { StringListInput } from "@/Components/admin/StringListInput";
import { ImageUpload } from "@/Components/admin/ImageUpload";
import { Save } from "lucide-react";

interface Post {
    id?: number;
    title: string;
    title_id?: string;
    slug: string;
    excerpt?: string;
    excerpt_id?: string;
    content?: string;
    content_id?: string;
    tags?: string[] | null;
    is_published?: boolean;
    published_at?: string | null;
    reading_minutes?: number | null;
    cover_url?: string;
}

export default function PostForm({ post: postData }: { post: Post | null }) {
    const isEdit = !!postData?.id;
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? ("PUT" as const) : ("POST" as const),
        title: postData?.title || "",
        title_id: postData?.title_id || "",
        slug: postData?.slug || "",
        excerpt: postData?.excerpt || "",
        excerpt_id: postData?.excerpt_id || "",
        content: postData?.content || "",
        content_id: postData?.content_id || "",
        tags: (postData?.tags || []) as string[],
        is_published: postData?.is_published ?? false,
        published_at: postData?.published_at?.slice(0, 16) || "",
        reading_minutes: postData?.reading_minutes ?? null,
        cover: null as File | null,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const url = isEdit
            ? route("admin.posts.update", postData!.id)
            : route("admin.posts.store");
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Post" : "New Post"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Posts", href: route("admin.posts.index") },
                { label: isEdit ? "Edit" : "Create" },
            ]}
        >
            <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <FormCard>
                        <Field label="Title (EN)" required error={errors.title}>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field label="Title (ID)" error={errors.title_id}>
                            <Input
                                value={data.title_id}
                                onChange={(e) =>
                                    setData("title_id", e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Slug"
                            hint="Leave empty to auto-generate"
                            error={errors.slug}
                        >
                            <Input
                                value={data.slug}
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Excerpt (EN)" error={errors.excerpt}>
                            <Textarea
                                rows={3}
                                value={data.excerpt}
                                onChange={(e) =>
                                    setData("excerpt", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Excerpt (ID)" error={errors.excerpt_id}>
                            <Textarea
                                rows={3}
                                value={data.excerpt_id}
                                onChange={(e) =>
                                    setData("excerpt_id", e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Content (EN, Markdown)"
                            error={errors.content}
                        >
                            <Textarea
                                rows={14}
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Content (ID, Markdown)"
                            error={errors.content_id}
                        >
                            <Textarea
                                rows={14}
                                value={data.content_id}
                                onChange={(e) =>
                                    setData("content_id", e.target.value)
                                }
                            />
                        </Field>
                    </FormCard>
                </div>
                <div className="space-y-6">
                    <FormCard
                        footer={
                            <button
                                disabled={processing}
                                className="btn-primary text-sm !px-5 !py-2.5"
                            >
                                <Save size={14} />
                                {processing ? "Saving…" : "Save"}
                            </button>
                        }
                    >
                        <h3 className="font-display text-base font-semibold text-white">
                            Cover
                        </h3>
                        <ImageUpload
                            value={postData?.cover_url}
                            onChange={(f) => setData("cover", f)}
                        />
                        <Checkbox
                            label="Published"
                            checked={data.is_published}
                            onChange={(e) =>
                                setData("is_published", e.target.checked)
                            }
                        />
                        <Field label="Publish Date">
                            <Input
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(e) =>
                                    setData("published_at", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Reading Minutes">
                            <Input
                                type="number"
                                value={data.reading_minutes ?? ""}
                                onChange={(e) =>
                                    setData(
                                        "reading_minutes",
                                        e.target.value === ""
                                            ? null
                                            : Number(e.target.value),
                                    )
                                }
                            />
                        </Field>
                    </FormCard>
                    <FormCard>
                        <StringListInput
                            label="Tags"
                            items={data.tags}
                            onChange={(v) => setData("tags", v)}
                            placeholder="e.g. Laravel"
                        />
                    </FormCard>
                </div>
            </form>
        </AdminLayout>
    );
}
