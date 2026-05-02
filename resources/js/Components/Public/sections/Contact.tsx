import { useForm, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    Sparkles,
    MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHeader } from "@/Components/ui/Section";
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

    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yOrb = useTransform(scrollYProgress, [0, 1], [-60, 60]);

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
            <div ref={ref} className="relative">
                <motion.div
                    style={{ y: yOrb }}
                    aria-hidden
                    className="pointer-events-none absolute -left-20 top-10 h-96 w-96 rounded-full bg-brand-500/15 blur-[140px]"
                />
                <motion.div
                    style={{ y: yOrb }}
                    aria-hidden
                    className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sun-500/10 blur-[140px]"
                />

                <SectionHeader
                    eyebrow={t("contact.eyebrow")}
                    title={t("contact.title")}
                    subtitle={t("contact.subtitle")}
                />

                <div className="grid gap-6 lg:grid-cols-5">
                    {/* Info card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/10 to-white/[0.02] p-8 backdrop-blur-xl">
                            {/* Decorative grid pattern */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-30"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
                                    backgroundSize: "24px 24px",
                                }}
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl"
                            />

                            <div className="relative">
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-100 backdrop-blur-md">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-70" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                    </span>
                                    {t("hero.available")}
                                </span>
                                <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                                    {profile?.name}
                                </h3>
                                <p className="mt-1 text-sm text-ink-200">
                                    {profile?.headline}
                                </p>

                                <ul className="mt-8 space-y-4">
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

                                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                                    <div className="flex items-start gap-3">
                                        <Sparkles
                                            size={18}
                                            className="mt-0.5 shrink-0 text-brand-300"
                                        />
                                        <p className="text-sm leading-relaxed text-ink-100">
                                            Fast response within{" "}
                                            <span className="font-semibold text-white">
                                                24 hours
                                            </span>
                                            . Let&apos;s build something great.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <div className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sun-500/10 blur-3xl"
                            />

                            <div className="relative">
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-ink-900 shadow-glow">
                                        <MessageCircle size={20} />
                                    </span>
                                    <h3 className="font-display text-xl font-semibold text-white">
                                        Send a message
                                    </h3>
                                </div>

                                <form onSubmit={submit} className="grid gap-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <FloatingField
                                            label={t("contact.form.name")}
                                            error={errors.name}
                                            value={data.name}
                                            onChange={(v) => setData("name", v)}
                                        />
                                        <FloatingField
                                            label={t("contact.form.email")}
                                            error={errors.email}
                                            type="email"
                                            value={data.email}
                                            onChange={(v) =>
                                                setData("email", v)
                                            }
                                        />
                                    </div>
                                    <FloatingField
                                        label={t("contact.form.subject")}
                                        error={errors.subject}
                                        value={data.subject}
                                        onChange={(v) => setData("subject", v)}
                                    />
                                    <FloatingField
                                        label={t("contact.form.message")}
                                        error={errors.message}
                                        value={data.message}
                                        onChange={(v) => setData("message", v)}
                                        textarea
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-primary group/btn mt-2 self-start"
                                    >
                                        {processing
                                            ? t("contact.form.sending")
                                            : t("contact.form.send")}
                                        <Send
                                            size={16}
                                            className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5"
                                        />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
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
        <div className="group/row flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink-950/60 text-brand-300 backdrop-blur-md transition-all group-hover/row:border-brand-400/40 group-hover/row:bg-brand-500/15">
                {icon}
            </span>
            <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink-300">
                    {label}
                </p>
                <p className="truncate text-sm font-medium text-white">
                    {value}
                </p>
            </div>
        </div>
    );
    return (
        <li>
            {href ? (
                <a href={href} className="block">
                    {content}
                </a>
            ) : (
                content
            )}
        </li>
    );
}

function FloatingField({
    label,
    value,
    onChange,
    error,
    type = "text",
    textarea,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
    type?: string;
    textarea?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const float = focused || value.length > 0;
    const baseProps = {
        value,
        onChange: (e: any) => onChange(e.target.value),
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        required: true,
        className:
            "peer block w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 pt-6 pb-2 text-sm text-white backdrop-blur-md transition-all focus:border-brand-400/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-brand-500/30",
    };
    return (
        <label className="relative block">
            {textarea ? (
                <textarea
                    {...baseProps}
                    rows={6}
                    className={baseProps.className + " resize-none"}
                />
            ) : (
                <input type={type} {...baseProps} />
            )}
            <span
                className={`pointer-events-none absolute left-4 transition-all duration-200 ${
                    float
                        ? "top-1.5 text-[10px] uppercase tracking-[0.2em] text-brand-300"
                        : "top-4 text-sm text-ink-300"
                }`}
            >
                {label}
            </span>
            {error && (
                <span className="mt-1 block text-xs text-red-400">{error}</span>
            )}
        </label>
    );
}
