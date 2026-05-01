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
import { Save } from "lucide-react";

interface Education {
    id?: number;
    degree: string;
    institution: string;
    start_date: string;
    end_date: string | null;
    description?: string;
    description_id?: string;
    order?: number;
    is_active?: boolean;
}

export default function EducationForm({
    education,
}: {
    education: Education | null;
}) {
    const isEdit = !!education?.id;
    const { data, setData, post, put, processing, errors } = useForm({
        degree: education?.degree || "",
        institution: education?.institution || "",
        start_date: education?.start_date?.slice(0, 10) || "",
        end_date: education?.end_date?.slice(0, 10) || "",
        description: education?.description || "",
        description_id: education?.description_id || "",
        order: education?.order ?? 0,
        is_active: education?.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) put(route("admin.educations.update", education!.id));
        else post(route("admin.educations.store"));
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Education" : "New Education"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Education", href: route("admin.educations.index") },
                { label: isEdit ? "Edit" : "Create" },
            ]}
        >
            <form onSubmit={submit}>
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
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                            label="Degree / Program"
                            required
                            error={errors.degree}
                        >
                            <Input
                                value={data.degree}
                                onChange={(e) =>
                                    setData("degree", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Institution"
                            required
                            error={errors.institution}
                        >
                            <Input
                                value={data.institution}
                                onChange={(e) =>
                                    setData("institution", e.target.value)
                                }
                                required
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
                            hint="Leave empty if ongoing"
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
                    <Field label="Description (EN)">
                        <Textarea
                            rows={3}
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                    </Field>
                    <Field label="Description (ID)">
                        <Textarea
                            rows={3}
                            value={data.description_id}
                            onChange={(e) =>
                                setData("description_id", e.target.value)
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
            </form>
        </AdminLayout>
    );
}
