import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import {
    CreditCard,
    Gauge,
    GraduationCap,
    Server,
    ServerCog,
    Smartphone,
    Database,
    Cloud,
    Cpu,
    Wrench,
    type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/Components/ui/Section";

export interface SkillItem {
    id: number;
    name: string;
    category: "frontend" | "backend" | "cms" | "other";
    icon?: string;
    level?: number;
}

// Map skill names (normalized) to simple-icons slugs (https://simpleicons.org)
const slugMap: Record<string, string> = {
    react: "react",
    reactjs: "react",
    next: "nextdotjs",
    nextjs: "nextdotjs",
    vue: "vuedotjs",
    vuejs: "vuedotjs",
    nuxt: "nuxt",
    nuxtjs: "nuxt",
    angular: "angular",
    svelte: "svelte",
    sveltekit: "svelte",
    typescript: "typescript",
    ts: "typescript",
    javascript: "javascript",
    js: "javascript",
    html: "html5",
    html5: "html5",
    css: "css3",
    css3: "css3",
    sass: "sass",
    scss: "sass",
    tailwind: "tailwindcss",
    tailwindcss: "tailwindcss",
    bootstrap: "bootstrap",
    framermotion: "framer",
    framer: "framer",
    gsap: "greensock",
    threejs: "threedotjs",
    three: "threedotjs",
    redux: "redux",
    vite: "vite",
    webpack: "webpack",
    figma: "figma",
    storybook: "storybook",
    php: "php",
    laravel: "laravel",
    livewire: "laravel",
    inertia: "inertia",
    inertiajs: "inertia",
    node: "nodedotjs",
    nodejs: "nodedotjs",
    express: "express",
    expressjs: "express",
    nestjs: "nestjs",
    nest: "nestjs",
    python: "python",
    django: "django",
    flask: "flask",
    fastapi: "fastapi",
    java: "openjdk",
    spring: "spring",
    springboot: "springboot",
    csharp: "csharp",
    dotnet: "dotnet",
    go: "go",
    golang: "go",
    rust: "rust",
    ruby: "ruby",
    rails: "rubyonrails",
    rubyonrails: "rubyonrails",
    mysql: "mysql",
    mariadb: "mariadb",
    postgresql: "postgresql",
    postgres: "postgresql",
    sqlite: "sqlite",
    mongodb: "mongodb",
    mongo: "mongodb",
    redis: "redis",
    graphql: "graphql",
    rest: "openapiinitiative",
    restapi: "openapiinitiative",
    wordpress: "wordpress",
    wp: "wordpress",
    woocommerce: "woocommerce",
    elementor: "elementor",
    odoo: "odoo",
    shopify: "shopify",
    drupal: "drupal",
    joomla: "joomla",
    moodle: "moodle",
    contentful: "contentful",
    strapi: "strapi",
    sanity: "sanity",
    docker: "docker",
    kubernetes: "kubernetes",
    k8s: "kubernetes",
    git: "git",
    github: "github",
    gitlab: "gitlab",
    bitbucket: "bitbucket",
    aws: "amazonwebservices",
    amazonwebservices: "amazonwebservices",
    gcp: "googlecloud",
    googlecloud: "googlecloud",
    azure: "microsoftazure",
    microsoftazure: "microsoftazure",
    vercel: "vercel",
    netlify: "netlify",
    railway: "railway",
    cloudflare: "cloudflare",
    nginx: "nginx",
    apache: "apache",
    linux: "linux",
    ubuntu: "ubuntu",
    bash: "gnubash",
    shell: "gnubash",
    vscode: "vscodium",
    visualstudiocode: "vscodium",
    postman: "postman",
    tableplus: "tableplus",
    jira: "jira",
    notion: "notion",
    slack: "slack",
    trello: "trello",
    photoshop: "adobephotoshop",
    illustrator: "adobeillustrator",
    xd: "adobexd",
    aftereffects: "adobeaftereffects",
    firebase: "firebase",
    supabase: "supabase",
    prisma: "prisma",
    sequelize: "sequelize",
};

// Slugs whose source SVG has tight bounds and look too small at default size.
// Render them scaled up so they read at the same visual weight as siblings.
const upscaleSlugs = new Set(["odoo", "woocommerce", "moodle", "tableplus"]);

// Lucide-icon fallbacks for skills that don't have a real brand logo
// (e.g. "Server Admin (SSH/FTP)", "PWA", "Core Web Vitals").
// Matched by substring against the lowercased name.
const lucideFallbacks: Array<{ match: RegExp; icon: LucideIcon }> = [
    {
        match: /core\s*web\s*vitals|performance|lighthouse|web\s*vitals/,
        icon: Gauge,
    },
    { match: /pwa|progressive\s*web/, icon: Smartphone },
    { match: /payment\s*gateway|midtrans|stripe|xendit/, icon: CreditCard },
    { match: /vps|deployment|deploy|hosting/, icon: Cloud },
    { match: /server\s*admin|ssh|ftp|sftp|cpanel/, icon: ServerCog },
    { match: /server/, icon: Server },
    { match: /lms|learning|moodle/, icon: GraduationCap },
    { match: /database|tableplus|dbeaver|sql\s*client/, icon: Database },
    { match: /api|rest|graphql/, icon: Cpu },
];

function lucideFallback(name: string): LucideIcon | null {
    const n = name.toLowerCase();
    for (const f of lucideFallbacks) if (f.match.test(n)) return f.icon;
    return null;
}

function normalize(s: string): string {
    return s
        .toLowerCase()
        .replace(/\.js\b/g, "")
        .replace(/\s+\d+(\.\d+)*$/g, "") // strip trailing version like "PHP 8"
        .replace(/[^a-z0-9]/g, "");
}

function logoSlug(name: string, icon?: string): string | null {
    // Allow override via `icon` only if it looks like a known simple-icons slug
    if (icon) {
        const ic = normalize(icon);
        if (slugMap[ic]) return slugMap[ic];
    }
    const key = normalize(name);
    if (slugMap[key]) return slugMap[key];
    // Try first word (e.g. "Tailwind CSS" -> "tailwind")
    const first = normalize(name.split(/\s+/)[0] || "");
    return slugMap[first] || null;
}

function TechLogo({
    name,
    icon,
    size = 18,
}: {
    name: string;
    icon?: string;
    size?: number;
}) {
    const slug = logoSlug(name, icon);
    const [errored, setErrored] = useState(false);

    // 1) Try a brand logo from simple-icons
    if (slug && !errored) {
        const scale = upscaleSlugs.has(slug) ? 1.4 : 1;
        return (
            <img
                src={`https://cdn.simpleicons.org/${slug}/white`}
                alt=""
                width={size}
                height={size}
                loading="lazy"
                onError={() => setErrored(true)}
                style={
                    scale !== 1
                        ? {
                              transform: `scale(${scale})`,
                              transformOrigin: "center",
                          }
                        : undefined
                }
                className="inline-block opacity-90"
            />
        );
    }

    // 2) Fall back to a representative Lucide icon based on the skill name
    const Fallback = lucideFallback(name) || Wrench;
    return (
        <Fallback
            size={size}
            strokeWidth={1.6}
            className="inline-block text-white opacity-90"
            aria-hidden
        />
    );
}

const categories: SkillItem["category"][] = [
    "frontend",
    "backend",
    "cms",
    "other",
];

const categoryAccent: Record<SkillItem["category"], string> = {
    frontend: "from-brand-500/30 to-sun-500/10",
    backend: "from-sky-500/25 to-emerald-500/10",
    cms: "from-fuchsia-500/25 to-brand-500/10",
    other: "from-emerald-500/25 to-sun-500/10",
};

const categoryDot: Record<SkillItem["category"], string> = {
    frontend: "bg-brand-400",
    backend: "bg-sky-400",
    cms: "bg-fuchsia-400",
    other: "bg-emerald-400",
};

export function Skills({ skills }: { skills: SkillItem[] }) {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const xMarq1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
    const xMarq2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);
    const yOrb = useTransform(scrollYProgress, [0, 1], [60, -60]);

    if (!skills?.length) return null;

    const row1 = [...skills, ...skills];
    const row2 = [...skills.slice().reverse(), ...skills.slice().reverse()];

    return (
        <Section id="skills">
            <div ref={ref} className="relative">
                {/* Decorative accents */}
                <motion.div
                    style={{ y: yOrb }}
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -top-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <div className="pt-6 md:pt-10">
                    <SectionHeader
                        eyebrow={t("skills.eyebrow")}
                        title={t("skills.title")}
                    />
                </div>

                {/* Dual marquee with parallax */}
                <div className="relative mb-16 space-y-3">
                    <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-950 to-transparent" />
                    <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-950 to-transparent" />

                    <div className="overflow-hidden">
                        <motion.div
                            style={{ x: xMarq1 }}
                            className="flex w-max gap-3"
                        >
                            {row1.map((s, i) => (
                                <span
                                    key={`r1-${s.id}-${i}`}
                                    className="group relative inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-ink-100 backdrop-blur-md transition-all hover:border-brand-400/40 hover:bg-brand-500/10 hover:text-white"
                                >
                                    <TechLogo
                                        name={s.name}
                                        icon={s.icon}
                                        size={22}
                                    />
                                    <span
                                        className={`inline-block h-1.5 w-1.5 rounded-full ${categoryDot[s.category]}`}
                                    />
                                    {s.name}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                    <div className="overflow-hidden">
                        <motion.div
                            style={{ x: xMarq2 }}
                            className="flex w-max gap-3"
                        >
                            {row2.map((s, i) => (
                                <span
                                    key={`r2-${s.id}-${i}`}
                                    className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-medium text-ink-200 backdrop-blur-md"
                                >
                                    <TechLogo
                                        name={s.name}
                                        icon={s.icon}
                                        size={22}
                                    />
                                    {s.name}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Category cards */}
                <div className="grid gap-5 md:grid-cols-2">
                    {categories.map((cat, idx) => {
                        const items = skills.filter((s) => s.category === cat);
                        if (!items.length) return null;
                        return (
                            <motion.div
                                key={cat}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: idx * 0.08,
                                }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-white/20"
                            >
                                {/* Gradient background accent */}
                                <div
                                    aria-hidden
                                    className={`pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-br ${categoryAccent[cat]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                                />
                                {/* Floating dot */}
                                <span
                                    className={`absolute right-6 top-6 h-2 w-2 rounded-full ${categoryDot[cat]} shadow-glow`}
                                />

                                <h3 className="mb-1 font-display text-xl font-semibold text-white">
                                    {t(`skills.categories.${cat}`)}
                                </h3>
                                <p className="mb-5 text-xs uppercase tracking-[0.2em] text-ink-300">
                                    {items.length} {t("skills.toolsSuffix")}
                                </p>
                                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                                    {items.map((s, i) => (
                                        <motion.div
                                            key={s.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.35,
                                                delay: 0.1 + i * 0.03,
                                            }}
                                            whileHover={{ y: -3, scale: 1.04 }}
                                            className="flex cursor-default flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-ink-900/60 px-3 py-4 text-center text-xs font-medium text-white shadow-sm transition-colors hover:border-brand-400/40 hover:bg-brand-500/15"
                                        >
                                            <TechLogo
                                                name={s.name}
                                                icon={s.icon}
                                                size={32}
                                            />
                                            <span className="truncate w-full">
                                                {s.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}
