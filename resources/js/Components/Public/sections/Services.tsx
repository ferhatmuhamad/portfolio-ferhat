import {
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import * as Icons from "lucide-react";
import { useRef } from "react";
import { Section, SectionHeader } from "@/Components/ui/Section";

export interface ServiceItem {
    id: number;
    title: string;
    title_id?: string;
    icon?: string;
    description: string;
    description_id?: string;
    features?: string[] | null;
}

function getIcon(name?: string) {
    if (!name) return Icons.Sparkles;
    const key = name.charAt(0).toUpperCase() + name.slice(1);
    return (Icons as any)[key] || Icons.Sparkles;
}

function ServiceCard({
    service,
    index,
    isId,
}: {
    service: ServiceItem;
    index: number;
    isId: boolean;
}) {
    const Icon = getIcon(service.icon);
    const cardRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
        stiffness: 150,
        damping: 14,
    });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
        stiffness: 150,
        damping: 14,
    });
    const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
    const spotlight = useTransform(
        [glowX, glowY] as any,
        ([x, y]: any) =>
            `radial-gradient(400px circle at ${x} ${y}, rgba(255,122,26,0.18), transparent 50%)`,
    );

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="group relative"
            style={{ perspective: 1200 }}
        >
            <motion.div
                style={{
                    rotateX: rx,
                    rotateY: ry,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 backdrop-blur-xl transition-shadow duration-500 hover:shadow-glow-lg"
            >
                {/* Mouse spotlight */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: spotlight }}
                />
                {/* Top-right corner number */}
                <span className="absolute right-5 top-5 font-display text-5xl font-bold text-white/[0.04]">
                    0{index + 1}
                </span>
                {/* Border-gradient on hover */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(255,122,26,0.4), transparent 40%, transparent 60%, rgba(255,209,102,0.3))",
                        WebkitMask:
                            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor" as any,
                        maskComposite: "exclude" as any,
                        padding: 1,
                    }}
                />

                <div
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-ink-900 shadow-glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <Icon size={28} strokeWidth={2.2} />
                    <div
                        aria-hidden
                        className="absolute -inset-2 -z-10 rounded-2xl bg-brand-gradient opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50"
                    />
                </div>

                <h3
                    className="mt-6 font-display text-2xl font-semibold text-white"
                    style={{ transform: "translateZ(30px)" }}
                >
                    {isId && service.title_id
                        ? service.title_id
                        : service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-200">
                    {isId && service.description_id
                        ? service.description_id
                        : service.description}
                </p>

                {service.features && service.features.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-white/5 pt-4">
                        {service.features.map((f, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-2.5 text-sm text-ink-100"
                            >
                                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400 shadow-glow" />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Bottom corner arrow */}
                <Icons.ArrowUpRight
                    size={18}
                    className="absolute bottom-5 right-5 text-ink-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-300 group-hover:opacity-100"
                />
            </motion.div>
        </motion.div>
    );
}

export function Services({ services }: { services: ServiceItem[] }) {
    const { t, i18n } = useTranslation();
    const isId = i18n.language === "id";
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yOrb1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
    const yOrb2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

    if (!services?.length) return null;

    return (
        <Section id="services">
            <div ref={ref} className="relative">
                {/* Decorative orbs */}
                <motion.div
                    style={{ y: yOrb1 }}
                    aria-hidden
                    className="pointer-events-none absolute -top-10 right-10 h-72 w-72 rounded-full bg-brand-500/10 blur-[120px]"
                />
                <motion.div
                    style={{ y: yOrb2 }}
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-sun-500/10 blur-[140px]"
                />

                <SectionHeader
                    eyebrow={t("services.eyebrow")}
                    title={t("services.title")}
                    subtitle={t("services.subtitle")}
                />
                <div className="grid gap-5 md:grid-cols-2">
                    {services.map((s, i) => (
                        <ServiceCard
                            key={s.id}
                            service={s}
                            index={i}
                            isId={isId}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
