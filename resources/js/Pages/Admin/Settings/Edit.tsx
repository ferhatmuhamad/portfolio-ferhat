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
import { StringListInput } from "@/Components/admin/StringListInput";
import { Save } from "lucide-react";

interface Settings {
    site_name?: string;
    site_tagline?: string;
    seo_description?: string;
    seo_keywords?: string[] | null;
    show_blog?: boolean;
    show_pricing?: boolean;
    show_testimonials?: boolean;
    default_locale?: "en" | "id";
}

export default function SettingsEdit({ settings }: { settings: Settings }) {
    const { data, setData, put, processing, errors } = useForm({
        site_name: settings.site_name || "",
        site_tagline: settings.site_tagline || "",
        seo_description: settings.seo_description || "",
        seo_keywords: (settings.seo_keywords || []) as string[],
        show_blog: settings.show_blog ?? true,
        show_pricing: settings.show_pricing ?? true,
        show_testimonials: settings.show_testimonials ?? true,
        default_locale: settings.default_locale || "en",
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(route("admin.settings.update"));
    };

    return (
        <AdminLayout
            title="Site Settings"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Settings" },
            ]}
        >
            <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
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
                        General
                    </h3>
                    <Field label="Site Name" error={errors.site_name}>
                        <Input
                            value={data.site_name}
                            onChange={(e) =>
                                setData("site_name", e.target.value)
                            }
                        />
                    </Field>
                    <Field label="Tagline" error={errors.site_tagline}>
                        <Input
                            value={data.site_tagline}
                            onChange={(e) =>
                                setData("site_tagline", e.target.value)
                            }
                        />
                    </Field>
                    <Field label="Default Locale">
                        <Select
                            value={data.default_locale}
                            onChange={(e) =>
                                setData(
                                    "default_locale",
                                    e.target.value as "en" | "id",
                                )
                            }
                        >
                            <option value="en">English</option>
                            <option value="id">Bahasa Indonesia</option>
                        </Select>
                    </Field>
                </FormCard>

                <FormCard>
                    <h3 className="font-display text-base font-semibold text-white">
                        SEO
                    </h3>
                    <Field
                        label="Meta Description"
                        hint="Shown in search results"
                        error={errors.seo_description}
                    >
                        <Textarea
                            rows={4}
                            value={data.seo_description}
                            onChange={(e) =>
                                setData("seo_description", e.target.value)
                            }
                        />
                    </Field>
                    <StringListInput
                        label="Keywords"
                        items={data.seo_keywords}
                        onChange={(v) => setData("seo_keywords", v)}
                        placeholder="e.g. laravel"
                    />
                </FormCard>

                <FormCard>
                    <h3 className="font-display text-base font-semibold text-white">
                        Section Visibility
                    </h3>
                    <p className="text-sm text-ink-300">
                        Toggle public sections on or off without deleting data.
                    </p>
                    <div className="space-y-3 pt-2">
                        <Checkbox
                            label="Show Blog section"
                            checked={data.show_blog}
                            onChange={(e) =>
                                setData("show_blog", e.target.checked)
                            }
                        />
                        <Checkbox
                            label="Show Pricing section"
                            checked={data.show_pricing}
                            onChange={(e) =>
                                setData("show_pricing", e.target.checked)
                            }
                        />
                        <Checkbox
                            label="Show Testimonials section"
                            checked={data.show_testimonials}
                            onChange={(e) =>
                                setData("show_testimonials", e.target.checked)
                            }
                        />
                    </div>
                </FormCard>
            </form>
        </AdminLayout>
    );
}
