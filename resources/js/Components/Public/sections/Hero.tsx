import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePage } from "@inertiajs/react";
import type { PageProps } from "@/types";

export function Hero() {
    const { t, i18n } = useTranslation();
    const { profile } = usePage<PageProps>().props;
    const summary =
        i18n.language === "id"
            ? profile?.summary_id || profile?.summary
            : profile?.summary;

    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center pt-28"
        >
            {/* Hero glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.18] blur-[180px]" />
            </div>
            <div className="container">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-200 backdrop-blur-md"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                        </span>
                        {t("hero.eyebrow")}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-7 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl"
                    >
                        {profile?.name?.split(" ")[0] || "Hi, I'm"}{" "}
                        <span className="text-gradient relative inline-block">
                            {profile?.name?.split(" ").slice(1).join(" ") ||
                                "Developer"}
                            <Sparkles className="absolute -right-8 -top-2 hidden h-6 w-6 text-sun-400 sm:block" />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mt-6 text-lg leading-relaxed text-ink-200 sm:text-xl"
                    >
                        {profile?.headline || t("hero.subtitle")}
                    </motion.p>

                    {summary && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-300 sm:text-base"
                        >
                            {summary}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55 }}
                        className="mt-10 flex flex-wrap items-center justify-center gap-3"
                    >
                        <a href="#contact" className="btn-primary">
                            {t("hero.ctaPrimary")}
                            <ArrowRight size={16} />
                        </a>
                        {profile?.cv_url && (
                            <a
                                href={profile.cv_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-ghost"
                            >
                                <Download size={16} />
                                {t("hero.ctaSecondary")}
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-24 flex justify-center"
                >
                    <a
                        href="#about"
                        className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-300"
                    >
                        <span>{t("hero.scroll")}</span>
                        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-ink-300/40 p-1.5">
                            <span className="h-2 w-1 animate-bounce rounded-full bg-brand-400" />
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
