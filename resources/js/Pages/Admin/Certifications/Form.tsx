import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Field, FormCard, Input, Checkbox } from "@/Components/admin/Form";
import { ImageUpload } from "@/Components/admin/ImageUpload";
import { Save } from "lucide-react";

interface Cert {
    id?: number;
    title: string;
    issuer: string;
    issued_at: string;
    credential_url?: string;
    image_url?: string;
    file_url?: string;
    order?: number;
    is_active?: boolean;
}

export default function CertForm({
    certification,
}: {
    certification: Cert | null;
}) {
    const isEdit = !!certification?.id;
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? ("PUT" as const) : ("POST" as const),
        title: certification?.title || "",
        issuer: certification?.issuer || "",
        issued_at: certification?.issued_at?.slice(0, 10) || "",
        credential_url: certification?.credential_url || "",
        image: null as File | null,
        file: null as File | null,
        order: certification?.order ?? 0,
        is_active: certification?.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const url = isEdit
            ? route("admin.certifications.update", certification!.id)
            : route("admin.certifications.store");
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Certification" : "New Certification"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                {
                    label: "Certifications",
                    href: route("admin.certifications.index"),
                },
                { label: isEdit ? "Edit" : "Create" },
            ]}
        >
            <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
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
                                label="Issuer"
                                required
                                error={errors.issuer}
                            >
                                <Input
                                    value={data.issuer}
                                    onChange={(e) =>
                                        setData("issuer", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field
                                label="Issued At"
                                required
                                error={errors.issued_at}
                            >
                                <Input
                                    type="date"
                                    value={data.issued_at}
                                    onChange={(e) =>
                                        setData("issued_at", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                        </div>
                        <Field
                            label="Credential URL"
                            error={errors.credential_url}
                        >
                            <Input
                                type="url"
                                value={data.credential_url}
                                onChange={(e) =>
                                    setData("credential_url", e.target.value)
                                }
                            />
                        </Field>
                        <div className="grid items-end gap-4 sm:grid-cols-2">
                            <Field label="Order">
                                <Input
                                    type="number"
                                    value={data.order}
                                    onChange={(e) =>
                                        setData("order", Number(e.target.value))
                                    }
                                />
                            </Field>
                            <Checkbox
                                label="Active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                            />
                        </div>
                    </FormCard>
                </div>
                <FormCard>
                    <h3 className="font-display text-base font-semibold text-white">
                        Badge / Certificate
                    </h3>
                    <ImageUpload
                        value={certification?.image_url}
                        onChange={(f) => setData("image", f)}
                    />
                    <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-semibold text-white">
                            Downloadable File (PDF / Image)
                        </h4>
                        <p className="text-xs text-ink-300">
                            Optional. Visitors can download this from the public
                            Continuous Learning section.
                        </p>
                        {certification?.file_url && (
                            <a
                                href={certification.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block truncate text-xs text-brand-300 hover:text-brand-200"
                            >
                                Current file →
                            </a>
                        )}
                        <input
                            type="file"
                            accept="application/pdf,image/*"
                            onChange={(e) =>
                                setData("file", e.target.files?.[0] || null)
                            }
                            className="block w-full text-sm text-ink-100 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-500/15 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-brand-200 hover:file:bg-brand-500/25"
                        />
                        {errors.file && (
                            <p className="text-xs text-red-400">
                                {errors.file}
                            </p>
                        )}
                    </div>
                </FormCard>
            </form>
        </AdminLayout>
    );
}
