import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import {
    Field,
    FormCard,
    Input,
    Select,
    Checkbox,
} from "@/Components/admin/Form";
import { Save } from "lucide-react";

interface Skill {
    id?: number;
    name: string;
    category: "frontend" | "backend" | "cms" | "other";
    icon?: string;
    level: number;
    order?: number;
    is_active?: boolean;
}

export default function SkillForm({ skill }: { skill: Skill | null }) {
    const isEdit = !!skill?.id;
    const { data, setData, post, put, processing, errors } = useForm({
        name: skill?.name || "",
        category: skill?.category || "frontend",
        icon: skill?.icon || "",
        level: skill?.level ?? 80,
        order: skill?.order ?? 0,
        is_active: skill?.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) put(route("admin.skills.update", skill!.id));
        else post(route("admin.skills.store"));
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Skill" : "New Skill"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Skills", href: route("admin.skills.index") },
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
                        <Field label="Name" required error={errors.name}>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Category"
                            required
                            error={errors.category}
                        >
                            <Select
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value as any)
                                }
                            >
                                <option value="frontend">Front End</option>
                                <option value="backend">Back End</option>
                                <option value="cms">CMS</option>
                                <option value="other">Other</option>
                            </Select>
                        </Field>
                        <Field label="Icon (optional)">
                            <Input
                                value={data.icon}
                                onChange={(e) =>
                                    setData("icon", e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Level (0-100)"
                            required
                            error={errors.level}
                        >
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                value={data.level}
                                onChange={(e) =>
                                    setData("level", Number(e.target.value))
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
                        <div className="flex items-end">
                            <Checkbox
                                label="Active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                            />
                        </div>
                    </div>
                </FormCard>
            </form>
        </AdminLayout>
    );
}
