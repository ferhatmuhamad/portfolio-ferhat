import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Field, FormCard, Input, Textarea } from "@/Components/admin/Form";
import { ImageUpload } from "@/Components/admin/ImageUpload";
import { Save, Plus, X } from "lucide-react";
import type { ProfileShared } from "@/types";

interface Props {
    profile: ProfileShared & {
        avatar_path?: string;
        cv_path?: string;
        hero_image_path?: string;
        about_image_path?: string;
    };
}

const socialKeys = [
    "github",
    "linkedin",
    "instagram",
    "twitter",
    "youtube",
    "facebook",
];

export default function ProfileEdit({ profile }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: profile.name || "",
        headline: profile.headline || "",
        summary: profile.summary || "",
        summary_id: profile.summary_id || "",
        footer_tagline: profile.footer_tagline || "",
        footer_tagline_id: profile.footer_tagline_id || "",
        email: profile.email || "",
        phone: profile.phone || "",
        whatsapp: profile.whatsapp || "",
        location: profile.location || "",
        socials: (profile.socials || {}) as Record<string, string>,
        stats: (profile.stats || []) as Array<{
            label: string;
            label_id?: string;
            value: number;
            suffix?: string;
        }>,
        avatar: null as File | null,
        hero_image: null as File | null,
        about_image: null as File | null,
        cv: null as File | null,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route("admin.profile.update"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const setSocial = (key: string, val: string) =>
        setData("socials", { ...data.socials, [key]: val });
    const updateStat = (
        i: number,
        patch: Partial<{
            label: string;
            label_id: string;
            value: number;
            suffix: string;
        }>,
    ) => {
        const next = [...data.stats];
        next[i] = { ...next[i], ...patch };
        setData("stats", next);
    };
    const addStat = () =>
        setData("stats", [...data.stats, { label: "", value: 0, suffix: "+" }]);
    const removeStat = (i: number) =>
        setData(
            "stats",
            data.stats.filter((_, idx) => idx !== i),
        );

    return (
        <AdminLayout
            title="Profile"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Profile" },
            ]}
        >
            <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <FormCard
                        footer={
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary text-sm !px-5 !py-2.5"
                            >
                                <Save size={14} />{" "}
                                {processing ? "Saving…" : "Save Changes"}
                            </button>
                        }
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Full Name"
                                required
                                error={errors.name}
                            >
                                <Input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                            <Field label="Email" required error={errors.email}>
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                            </Field>
                        </div>
                        <Field
                            label="Headline"
                            required
                            error={errors.headline}
                        >
                            <Input
                                value={data.headline}
                                onChange={(e) =>
                                    setData("headline", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Summary (English)"
                            required
                            error={errors.summary}
                        >
                            <Textarea
                                rows={5}
                                value={data.summary}
                                onChange={(e) =>
                                    setData("summary", e.target.value)
                                }
                                required
                            />
                        </Field>
                        <Field
                            label="Summary (Bahasa Indonesia)"
                            error={errors.summary_id}
                        >
                            <Textarea
                                rows={5}
                                value={data.summary_id}
                                onChange={(e) =>
                                    setData("summary_id", e.target.value)
                                }
                            />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label="Footer tagline (English)"
                                hint="Short one-liner shown under your name in the footer."
                                error={errors.footer_tagline}
                            >
                                <Textarea
                                    rows={2}
                                    value={data.footer_tagline}
                                    onChange={(e) =>
                                        setData(
                                            "footer_tagline",
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                            <Field
                                label="Footer tagline (Bahasa Indonesia)"
                                error={errors.footer_tagline_id}
                            >
                                <Textarea
                                    rows={2}
                                    value={data.footer_tagline_id}
                                    onChange={(e) =>
                                        setData(
                                            "footer_tagline_id",
                                            e.target.value,
                                        )
                                    }
                                />
                            </Field>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field label="Phone">
                                <Input
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />
                            </Field>
                            <Field
                                label="WhatsApp"
                                hint="Country code, no '+' (e.g. 6281234567890)"
                            >
                                <Input
                                    value={data.whatsapp}
                                    onChange={(e) =>
                                        setData("whatsapp", e.target.value)
                                    }
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
                        </div>
                    </FormCard>

                    <FormCard>
                        <div>
                            <h3 className="font-display text-base font-semibold text-white">
                                Stats Counter
                            </h3>
                            <p className="mt-1 text-xs text-ink-300">
                                Numbers shown in the About section.
                            </p>
                        </div>
                        <div className="space-y-3">
                            {data.stats.map((s, i) => (
                                <div
                                    key={i}
                                    className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 sm:grid-cols-[2fr_2fr_1fr_1fr_auto]"
                                >
                                    <Input
                                        placeholder="Label (EN)"
                                        value={s.label}
                                        onChange={(e) =>
                                            updateStat(i, {
                                                label: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Label (ID)"
                                        value={s.label_id || ""}
                                        onChange={(e) =>
                                            updateStat(i, {
                                                label_id: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Value"
                                        value={s.value}
                                        onChange={(e) =>
                                            updateStat(i, {
                                                value: Number(e.target.value),
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Suffix"
                                        value={s.suffix || ""}
                                        onChange={(e) =>
                                            updateStat(i, {
                                                suffix: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeStat(i)}
                                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-300 hover:border-red-500/40 hover:text-red-300"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addStat}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-white/15 px-3 py-2 text-xs font-medium text-ink-300 hover:border-brand-500/40 hover:text-brand-300"
                            >
                                <Plus size={14} /> Add stat
                            </button>
                        </div>
                    </FormCard>

                    <FormCard>
                        <h3 className="font-display text-base font-semibold text-white">
                            Social Links
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {socialKeys.map((k) => (
                                <Field
                                    key={k}
                                    label={
                                        k.charAt(0).toUpperCase() + k.slice(1)
                                    }
                                >
                                    <Input
                                        type="url"
                                        placeholder={`https://${k}.com/...`}
                                        value={data.socials[k] || ""}
                                        onChange={(e) =>
                                            setSocial(k, e.target.value)
                                        }
                                    />
                                </Field>
                            ))}
                        </div>
                    </FormCard>
                </div>

                <div className="space-y-6">
                    <FormCard>
                        <h3 className="font-display text-base font-semibold text-white">
                            Avatar
                        </h3>
                        <p className="text-xs text-ink-300">
                            Used as fallback for Hero & About when those are
                            empty.
                        </p>
                        <ImageUpload
                            value={profile.avatar_url || undefined}
                            onChange={(f) => setData("avatar", f)}
                            label="Avatar"
                        />
                        {errors.avatar && (
                            <p className="text-xs text-red-400">
                                {errors.avatar}
                            </p>
                        )}
                    </FormCard>
                    <FormCard>
                        <h3 className="font-display text-base font-semibold text-white">
                            Hero Photo
                        </h3>
                        <p className="text-xs text-ink-300">
                            Shown on the public Hero section. Recommended
                            portrait orientation (4:5).
                        </p>
                        <ImageUpload
                            value={profile.hero_image_url || undefined}
                            onChange={(f) => setData("hero_image", f)}
                            label="Hero photo"
                        />
                        {errors.hero_image && (
                            <p className="text-xs text-red-400">
                                {errors.hero_image}
                            </p>
                        )}
                    </FormCard>
                    <FormCard>
                        <h3 className="font-display text-base font-semibold text-white">
                            About Photo
                        </h3>
                        <p className="text-xs text-ink-300">
                            Shown on the public About section. Use a different
                            shot for variety.
                        </p>
                        <ImageUpload
                            value={profile.about_image_url || undefined}
                            onChange={(f) => setData("about_image", f)}
                            label="About photo"
                        />
                        {errors.about_image && (
                            <p className="text-xs text-red-400">
                                {errors.about_image}
                            </p>
                        )}
                    </FormCard>
                    <FormCard>
                        <h3 className="font-display text-base font-semibold text-white">
                            CV / Resume (PDF)
                        </h3>
                        {profile.cv_url && (
                            <a
                                href={profile.cv_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-xs text-brand-300 hover:text-brand-200 truncate"
                            >
                                Current: {profile.cv_path}
                            </a>
                        )}
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) =>
                                setData("cv", e.target.files?.[0] || null)
                            }
                            className="block w-full text-sm text-ink-100 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-500/15 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-brand-200 hover:file:bg-brand-500/25"
                        />
                        {errors.cv && (
                            <p className="text-xs text-red-400">{errors.cv}</p>
                        )}
                    </FormCard>
                </div>
            </form>
        </AdminLayout>
    );
}
