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
import { Save } from "lucide-react";

interface Service {
    id?: number;
    title: string;
    title_id?: string;
    icon?: string;
    description: string;
    description_id?: string;
    features?: string[] | null;
    order?: number;
    is_active?: boolean;
}

export default function ServiceForm({ service }: { service: Service | null }) {
    const isEdit = !!service?.id;
    const { data, setData, post, put, processing, errors } = useForm({
        title: service?.title || "",
        title_id: service?.title_id || "",
        icon: service?.icon || "",
        description: service?.description || "",
        description_id: service?.description_id || "",
        features: (service?.features || []) as string[],
        order: service?.order ?? 0,
        is_active: service?.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) put(route("admin.services.update", service!.id));
        else post(route("admin.services.store"));
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Service" : "New Service"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Services", href: route("admin.services.index") },
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
                    </div>
                    <Field
                        label="Icon (Lucide name)"
                        hint="e.g. Code, Layers, Database, Wrench"
                        error={errors.icon}
                    >
                        <Input
                            value={data.icon}
                            onChange={(e) => setData("icon", e.target.value)}
                        />
                    </Field>
                    <Field
                        label="Description (EN)"
                        required
                        error={errors.description}
                    >
                        <Textarea
                            rows={4}
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            required
                        />
                    </Field>
                    <Field
                        label="Description (ID)"
                        error={errors.description_id}
                    >
                        <Textarea
                            rows={4}
                            value={data.description_id}
                            onChange={(e) =>
                                setData("description_id", e.target.value)
                            }
                        />
                    </Field>
                    <StringListInput
                        label="Features"
                        items={data.features}
                        onChange={(v) => setData("features", v)}
                        placeholder="Feature bullet"
                    />
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
