import { usePage } from "@inertiajs/react";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PageProps } from "@/types";

export function Footer() {
    const { profile, site } = usePage<PageProps>().props;
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/5 bg-ink-950 pt-20 pb-10">
            <div className="container">
                <div className="grid gap-12 md:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient font-display text-xl font-bold text-ink-900 shadow-glow">
                                F
                            </div>
                            <div>
                                <p className="font-display text-lg font-semibold text-white">
                                    {profile?.name}
                                </p>
                                <p className="text-sm text-ink-300">
                                    {site?.tagline}
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-300">
                            {profile?.headline}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-300">
                            Contact
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm">
                            {profile?.email && (
                                <li className="flex items-center gap-3 text-ink-100">
                                    <Mail
                                        size={16}
                                        className="text-brand-400"
                                    />
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="hover:text-brand-300"
                                    >
                                        {profile.email}
                                    </a>
                                </li>
                            )}
                            {profile?.phone && (
                                <li className="flex items-center gap-3 text-ink-100">
                                    <Phone
                                        size={16}
                                        className="text-brand-400"
                                    />
                                    <a
                                        href={`tel:${profile.phone}`}
                                        className="hover:text-brand-300"
                                    >
                                        {profile.phone}
                                    </a>
                                </li>
                            )}
                            {profile?.location && (
                                <li className="flex items-center gap-3 text-ink-100">
                                    <MapPin
                                        size={16}
                                        className="text-brand-400"
                                    />
                                    <span>{profile.location}</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-300">
                            Follow
                        </h3>
                        <div className="mt-4 flex gap-3">
                            {profile?.socials?.github && (
                                <a
                                    href={profile.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 transition-all hover:bg-brand-gradient hover:text-ink-900"
                                >
                                    <Github size={16} />
                                </a>
                            )}
                            {profile?.socials?.linkedin && (
                                <a
                                    href={profile.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 transition-all hover:bg-brand-gradient hover:text-ink-900"
                                >
                                    <Linkedin size={16} />
                                </a>
                            )}
                            {profile?.socials?.instagram && (
                                <a
                                    href={profile.socials.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 transition-all hover:bg-brand-gradient hover:text-ink-900"
                                >
                                    <Instagram size={16} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-ink-300 sm:flex-row">
                    <p>
                        © {year} {profile?.name}. {t("footer.rights")}
                    </p>
                    <p>{t("footer.made")}</p>
                </div>
            </div>
        </footer>
    );
}
