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

interface Experience {
    id?: number;
    role: string;
    company: string;
    location?: string;
    start_date: string;
    end_date: string | null;
    description?: string;
    description_id?: string;
    highlights?: string[] | null;
    highlights_id?: string[] | null;
    logo_url?: string;
    order?: number;
    is_active?: boolean;
}

export default function ExperienceForm({
    experience,
}: {
    experience: Experience | null;
}) {
    const isEdit = !!experience?.id;
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? ("PUT" as const) : ("POST" as const),
        role: experience?.role || "",
        company: experience?.company || "",
        location: experience?.location || "",
        start_date: experience?.start_date?.slice(0, 10) || "",
        end_date: experience?.end_date?.slice(0, 10) || "",
        description: experience?.description || "",
        description_id: experience?.description_id || "",
        highlights: (experience?.highlights || []) as string[],
        highlights_id: (experience?.highlights_id || []) as string[],
        logo: null as File | null,
        order: experience?.order ?? 0,
        is_active: experience?.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const url = isEdit
            ? route("admin.experiences.update", experience!.id)
            : route("admin.experiences.store");
        post(url, { forceFormData: true });
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Experience" : "New Experience"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Experience", href: route("admin.experiences.index") },
                { label: isEdit ? "Edit" : "Create" },
            ]}
        >
            <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <FormCard>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Role" required error={errors.role}>
                                <Input
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field
                                label="Company"
                                required
                                error={errors.company}
                            >
                                <Input
                                    value={data.company}
                                    onChange={(e) =>
                                        setData("company", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field label="Location">
                                <Input
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
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
                            <Field
                                label="Start Date"
                                required
                                error={errors.start_date}
                            >
                                <Input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field
                                label="End Date"
                                hint="Leave empty for current"
                                error={errors.end_date}
                            >
                                <Input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData("end_date", e.target.value)
                                    }
                                />
                            </Field>
                        </div>
                        <Field
                            label="Description (EN)"
                            error={errors.description}
                        >
                            <Textarea
                                rows={3}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Description (ID)"
                            error={errors.description_id}
                        >
                            <Textarea
                                rows={3}
                                value={data.description_id}
                                onChange={(e) =>
                                    setData("description_id", e.target.value)
                                }
                            />
                        </Field>
                    </FormCard>
                    <FormCard>
                        <h3 className="font-display text-base font-semibold text-white">
                            Highlights
                        </h3>
                        <StringListInput
                            label="Highlights (EN)"
                            items={data.highlights}
                            onChange={(v) => setData("highlights", v)}
                        />
                        <StringListInput
                            label="Highlights (ID)"
                            items={data.highlights_id}
                            onChange={(v) => setData("highlights_id", v)}
                        />
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
                            Company Logo
                        </h3>
                        <ImageUpload
                            value={experience?.logo_url}
                            onChange={(f) => setData("logo", f)}
                        />
                        <Checkbox
                            label="Active"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                        />
                    </FormCard>
                </div>
            </form>
        </AdminLayout>
    );
}
