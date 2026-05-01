import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import {
    Field,
    FormCard,
    Input,
    Textarea,
    Select,
    Checkbox,
} from "@/Components/admin/Form";
import { ImageUpload } from "@/Components/admin/ImageUpload";
import { Save } from "lucide-react";

interface T {
    id?: number;
    name: string;
    role: string;
    company?: string;
    quote: string;
    quote_id?: string;
    rating: number;
    avatar_url?: string;
    order?: number;
    is_active?: boolean;
}

export default function TestimonialForm({
    testimonial,
}: {
    testimonial: T | null;
}) {
    const isEdit = !!testimonial?.id;
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? ("PUT" as const) : ("POST" as const),
        name: testimonial?.name || "",
        role: testimonial?.role || "",
        company: testimonial?.company || "",
        quote: testimonial?.quote || "",
        quote_id: testimonial?.quote_id || "",
        rating: testimonial?.rating ?? 5,
        avatar: null as File | null,
        order: testimonial?.order ?? 0,
        is_active: testimonial?.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const url = isEdit
            ? route("admin.testimonials.update", testimonial!.id)
            : route("admin.testimonials.store");
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Testimonial" : "New Testimonial"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                {
                    label: "Testimonials",
                    href: route("admin.testimonials.index"),
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
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field label="Name" required error={errors.name}>
                                <Input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field label="Role" required error={errors.role}>
                                <Input
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field label="Company">
                                <Input
                                    value={data.company}
                                    onChange={(e) =>
                                        setData("company", e.target.value)
                                    }
                                />
                            </Field>
                        </div>
                        <Field label="Quote (EN)" required error={errors.quote}>
                            <Textarea
                                rows={4}
                                value={data.quote}
                                onChange={(e) =>
                                    setData("quote", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field label="Quote (ID)" error={errors.quote_id}>
                            <Textarea
                                rows={4}
                                value={data.quote_id}
                                onChange={(e) =>
                                    setData("quote_id", e.target.value)
                                }
                            />
                        </Field>
                        <div className="grid items-end gap-4 sm:grid-cols-3">
                            <Field
                                label="Rating"
                                required
                                error={errors.rating}
                            >
                                <Select
                                    value={data.rating}
                                    onChange={(e) =>
                                        setData(
                                            "rating",
                                            Number(e.target.value),
                                        )
                                    }
                                >
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <option key={n} value={n}>
                                            {n} ★
                                        </option>
                                    ))}
                                </Select>
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
                        Avatar
                    </h3>
                    <ImageUpload
                        value={testimonial?.avatar_url}
                        onChange={(f) => setData("avatar", f)}
                    />
                </FormCard>
            </form>
        </AdminLayout>
    );
}
