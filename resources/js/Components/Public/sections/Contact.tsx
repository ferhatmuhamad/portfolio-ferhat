import { useForm, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { FormEvent, useEffect } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import toast from "react-hot-toast";
import { Section, SectionHeader } from "@/Components/ui/Section";
import { Glass } from "@/Components/ui/Glass";
import type { PageProps } from "@/types";

export function Contact() {
    const { t } = useTranslation();
    const { profile, flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            reset();
        }
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route("contact.store"), { preserveScroll: true });
    };

    return (
        <Section id="contact">
            <SectionHeader
                eyebrow={t("contact.eyebrow")}
                title={t("contact.title")}
                subtitle={t("contact.subtitle")}
            />
            <div className="grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <Glass className="h-full p-7">
                        <h3 className="font-display text-xl font-semibold text-white">
                            {profile?.name}
                        </h3>
                        <p className="mt-1 text-sm text-ink-200">
                            {profile?.headline}
                        </p>
                        <ul className="mt-6 space-y-4 border-t border-white/5 pt-6">
                            {profile?.email && (
                                <ContactRow
                                    icon={<Mail size={16} />}
                                    label={t("contact.info.email")}
                                    value={profile.email}
                                    href={`mailto:${profile.email}`}
                                />
                            )}
                            {profile?.phone && (
                                <ContactRow
                                    icon={<Phone size={16} />}
                                    label={t("contact.info.phone")}
                                    value={profile.phone}
                                    href={`tel:${profile.phone}`}
                                />
                            )}
                            {profile?.location && (
                                <ContactRow
                                    icon={<MapPin size={16} />}
                                    label={t("contact.info.location")}
                                    value={profile.location}
                                />
                            )}
                        </ul>
                    </Glass>
                </div>

                <Glass className="p-7 lg:col-span-3">
                    <form onSubmit={submit} className="grid gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field
                                label={t("contact.form.name")}
                                error={errors.name}
                            >
                                <input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    className="input-field"
                                />
                            </Field>
                            <Field
                                label={t("contact.form.email")}
                                error={errors.email}
                            >
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    className="input-field"
                                />
                            </Field>
                        </div>
                        <Field
                            label={t("contact.form.subject")}
                            error={errors.subject}
                        >
                            <input
                                value={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                                required
                                className="input-field"
                            />
                        </Field>
                        <Field
                            label={t("contact.form.message")}
                            error={errors.message}
                        >
                            <textarea
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                required
                                rows={6}
                                className="input-field resize-none"
                            />
                        </Field>
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-primary mt-2 self-start"
                        >
                            {processing
                                ? t("contact.form.sending")
                                : t("contact.form.send")}
                            <Send size={16} />
                        </button>
                    </form>
                </Glass>
            </div>
        </Section>
    );
}

function ContactRow({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    const content = (
        <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                {icon}
            </span>
            <div>
                <p className="text-xs uppercase tracking-wider text-ink-300">
                    {label}
                </p>
                <p className="text-sm font-medium text-white">{value}</p>
            </div>
        </div>
    );
    return (
        <li>
            {href ? (
                <a href={href} className="block hover:text-brand-300">
                    {content}
                </a>
            ) : (
                content
            )}
        </li>
    );
}

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-300">
                {label}
            </span>
            {children}
            {error && (
                <span className="mt-1 block text-xs text-red-400">{error}</span>
            )}
        </label>
    );
}
