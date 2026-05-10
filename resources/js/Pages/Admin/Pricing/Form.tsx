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

interface Plan {
    id?: number;
    name: string;
    name_id?: string;
    tagline?: string;
    tagline_id?: string;
    price: number | null;
    price_usd?: number | null;
    currency: string;
    billing_period?: string;
    features?: string[] | null;
    features_id?: string[] | null;
    is_popular?: boolean;
    cta_label?: string;
    cta_url?: string;
    order?: number;
    is_active?: boolean;
}

export default function PricingForm({ plan }: { plan: Plan | null }) {
    const isEdit = !!plan?.id;
    const { data, setData, post, put, processing, errors } = useForm({
        name: plan?.name || "",
        name_id: plan?.name_id || "",
        tagline: plan?.tagline || "",
        tagline_id: plan?.tagline_id || "",
        price: plan?.price ?? null,
        price_usd: plan?.price_usd ?? null,
        currency: plan?.currency || "IDR",
        billing_period: plan?.billing_period || "project",
        features: (plan?.features || []) as string[],
        features_id: (plan?.features_id || []) as string[],
        is_popular: plan?.is_popular ?? false,
        cta_label: plan?.cta_label || "",
        cta_url: plan?.cta_url || "",
        order: plan?.order ?? 0,
        is_active: plan?.is_active ?? true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (isEdit) put(route("admin.pricing.update", plan!.id));
        else post(route("admin.pricing.store"));
    };

    return (
        <AdminLayout
            title={isEdit ? "Edit Plan" : "New Plan"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Pricing", href: route("admin.pricing.index") },
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
                        <Field label="Name (EN)" required error={errors.name}>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field label="Name (ID)" error={errors.name_id}>
                            <Input
                                value={data.name_id}
                                onChange={(e) =>
                                    setData("name_id", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Tagline (EN)">
                            <Input
                                value={data.tagline}
                                onChange={(e) =>
                                    setData("tagline", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="Tagline (ID)">
                            <Input
                                value={data.tagline_id}
                                onChange={(e) =>
                                    setData("tagline_id", e.target.value)
                                }
                            />
                        </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Field
                            label="Price (base)"
                            hint="Empty = Custom. In the currency below."
                        >
                            <Input
                                type="number"
                                step="0.01"
                                value={data.price ?? ""}
                                onChange={(e) =>
                                    setData(
                                        "price",
                                        e.target.value === ""
                                            ? null
                                            : Number(e.target.value),
                                    )
                                }
                            />
                        </Field>
                        <Field
                            label="Price (USD override)"
                            hint="Optional. Used when visitor toggles to USD."
                        >
                            <Input
                                type="number"
                                step="0.01"
                                value={data.price_usd ?? ""}
                                onChange={(e) =>
                                    setData(
                                        "price_usd",
                                        e.target.value === ""
                                            ? null
                                            : Number(e.target.value),
                                    )
                                }
                            />
                        </Field>
                        <Field label="Currency" required>
                            <Input
                                value={data.currency}
                                onChange={(e) =>
                                    setData("currency", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Billing Period"
                            hint="Use 'hour' or 'jam' to show in the Per Hour tab"
                        >
                            <select
                                value={data.billing_period}
                                onChange={(e) =>
                                    setData("billing_period", e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-ink-100 outline-none transition focus:border-brand-400 focus:bg-white/10"
                            >
                                <option value="project">project</option>
                                <option value="hour">hour</option>
                                <option value="jam">jam</option>
                                <option value="month">month</option>
                                <option value="bulan">bulan</option>
                                <option value="year">year</option>
                                <option value="tahun">tahun</option>
                                <option value="custom">custom</option>
                            </select>
                        </Field>
                    </div>
                    <StringListInput
                        label="Features (EN)"
                        items={data.features}
                        onChange={(v) => setData("features", v)}
                    />
                    <StringListInput
                        label="Features (ID)"
                        items={data.features_id}
                        onChange={(v) => setData("features_id", v)}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="CTA Label">
                            <Input
                                value={data.cta_label}
                                onChange={(e) =>
                                    setData("cta_label", e.target.value)
                                }
                            />
                        </Field>
                        <Field label="CTA URL">
                            <Input
                                value={data.cta_url}
                                onChange={(e) =>
                                    setData("cta_url", e.target.value)
                                }
                            />
                        </Field>
                    </div>
                    <div className="grid items-end gap-4 sm:grid-cols-3">
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
                            label="Most Popular"
                            checked={data.is_popular}
                            onChange={(e) =>
                                setData("is_popular", e.target.checked)
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
            </form>
        </AdminLayout>
    );
}
