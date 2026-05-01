import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent, useState } from "react";
import {
    Field,
    FormCard,
    Input,
    Textarea,
    Checkbox,
} from "@/Components/admin/Form";
import { StringListInput } from "@/Components/admin/StringListInput";
import { ImageUpload } from "@/Components/admin/ImageUpload";
import { Save, X, Upload } from "lucide-react";

interface Project {
    id?: number;
    title: string;
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
    is_featured?: boolean;
    is_active?: boolean;
    order?: number;
    cover_url?: string;
    gallery?: string[] | null;
    gallery_urls?: string[] | null;
}

export default function ProjectForm({ project }: { project: Project | null }) {
    const isEdit = !!project?.id;
    const [previews, setPreviews] = useState<string[]>([]);
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? ("PUT" as const) : ("POST" as const),
        title: project?.title || "",
        category: project?.category || "",
        client: project?.client || "",
        summary: project?.summary || "",
        summary_id: project?.summary_id || "",
        content: project?.content || "",
        content_id: project?.content_id || "",
        tech_stack: (project?.tech_stack || []) as string[],
        live_url: project?.live_url || "",
        repo_url: project?.repo_url || "",
        completed_at: project?.completed_at?.slice(0, 10) || "",
        is_featured: project?.is_featured ?? false,
        is_active: project?.is_active ?? true,
        order: project?.order ?? 0,
        cover: null as File | null,
        gallery: (project?.gallery || []) as string[],
        gallery_files: [] as File[],
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const url = isEdit
            ? route("admin.projects.update", project!.id)
            : route("admin.projects.store");
        post(url, { forceFormData: true });
    };

    const handleGalleryFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setData("gallery_files", [...data.gallery_files, ...files]);
        files.forEach((f) => {
            const r = new FileReader();
            r.onload = () => setPreviews((p) => [...p, r.result as string]);
            r.readAsDataURL(f);
        });
    };

    const removeExisting = (path: string) =>
        setData(
            "gallery",
            data.gallery.filter((p) => p !== path),
        );
    const removeNew = (i: number) => {
        setData(
            "gallery_files",
            data.gallery_files.filter((_, idx) => idx !== i),
        );
        setPreviews(previews.filter((_, idx) => idx !== i));
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Project" : "New Project"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Projects", href: route("admin.projects.index") },
                { label: isEdit ? "Edit" : "Create" },
            ]}
        >
            <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <FormCard>
                        <Field label="Title" required error={errors.title}>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Category"
                                hint="e.g. wordpress, laravel, react, odoo"
                                required
                                error={errors.category}
                            >
                                <Input
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field label="Client">
                                <Input
                                    value={data.client}
                                    onChange={(e) =>
                                        setData("client", e.target.value)
                                    }
                                />
                            </Field>
                        </div>
                        <Field
                            label="Summary (EN)"
                            required
                            error={errors.summary}
                        >
                            <Textarea
                                rows={3}
                                value={data.summary}
                                onChange={(e) =>
                                    setData("summary", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field label="Summary (ID)" error={errors.summary_id}>
                            <Textarea
                                rows={3}
                                value={data.summary_id}
                                onChange={(e) =>
                                    setData("summary_id", e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Content (EN, Markdown)"
                            error={errors.content}
                        >
                            <Textarea
                                rows={8}
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
                                rows={8}
                                value={data.content_id}
                                onChange={(e) =>
                                    setData("content_id", e.target.value)
                                }
                            />
                        </Field>
                    </FormCard>

                    <FormCard>
                        <h3 className="font-display text-base font-semibold text-white">
                            Gallery
                        </h3>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                            {data.gallery.map((p) => (
                                <div
                                    key={p}
                                    className="group relative aspect-square overflow-hidden rounded-xl border border-white/10"
                                >
                                    <img
                                        src={`/storage/${p}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeExisting(p)}
                                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            {previews.map((src, i) => (
                                <div
                                    key={i}
                                    className="group relative aspect-square overflow-hidden rounded-xl border border-brand-500/30"
                                >
                                    <img
                                        src={src}
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNew(i)}
                                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] text-ink-300 hover:border-brand-500/40 hover:text-brand-300">
                                <Upload size={18} />
                                <span className="text-[10px] font-medium uppercase tracking-wider">
                                    Add
                                </span>
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="image/*"
                                    onChange={handleGalleryFiles}
                                />
                            </label>
                        </div>
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
                            Cover Image
                        </h3>
                        <ImageUpload
                            value={project?.cover_url}
                            onChange={(f) => setData("cover", f)}
                        />
                        <Field label="Live URL">
                            <Input
                                type="url"
                                value={data.live_url}
                                onChange={(e) =>
                                    setData("live_url", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Repo URL">
                            <Input
                                type="url"
                                value={data.repo_url}
                                onChange={(e) =>
                                    setData("repo_url", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Completed Date">
                            <Input
                                type="date"
                                value={data.completed_at}
                                onChange={(e) =>
                                    setData("completed_at", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Order">
                            <Input
                                type="number"
                                value={data.order}
                                onChange={(e) =>
                                    setData("order", Number(e.target.value))
                                }
                            />
                        </Field>
                        <div className="space-y-2">
                            <Checkbox
                                label="Featured"
                                checked={data.is_featured}
                                onChange={(e) =>
                                    setData("is_featured", e.target.checked)
                                }
                            />
                            <Checkbox
                                label="Active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                            />
                        </div>
                    </FormCard>
                    <FormCard>
                        <StringListInput
                            label="Tech Stack"
                            items={data.tech_stack}
                            onChange={(v) => setData("tech_stack", v)}
                            placeholder="e.g. Laravel"
                        />
                    </FormCard>
                </div>
            </form>
        </AdminLayout>
    );
}
