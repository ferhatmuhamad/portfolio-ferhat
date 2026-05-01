import { ReactNode, useEffect, useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    User,
    Briefcase,
    GraduationCap,
    Award,
    FolderKanban,
    MessageSquare,
    Quote,
    DollarSign,
    FileText,
    Mail,
    Settings as SettingsIcon,
    LogOut,
    ChevronLeft,
    Menu,
    ExternalLink,
    Sparkles,
    Code2,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/cn";
import type { PageProps } from "@/types";

interface AdminLayoutProps {
    children: ReactNode;
    title: string;
    breadcrumbs?: { label: string; href?: string }[];
    actions?: ReactNode;
}

const navGroups = [
    {
        label: "Overview",
        items: [
            {
                label: "Dashboard",
                href: "/admin-ferhat",
                icon: LayoutDashboard,
                match: /^\/admin-ferhat\/?$/,
            },
            { label: "Profile", href: "/admin-ferhat/profile", icon: User },
        ],
    },
    {
        label: "Content",
        items: [
            {
                label: "Services",
                href: "/admin-ferhat/services",
                icon: Sparkles,
            },
            { label: "Skills", href: "/admin-ferhat/skills", icon: Code2 },
            {
                label: "Experience",
                href: "/admin-ferhat/experiences",
                icon: Briefcase,
            },
            {
                label: "Education",
                href: "/admin-ferhat/educations",
                icon: GraduationCap,
            },
            {
                label: "Certifications",
                href: "/admin-ferhat/certifications",
                icon: Award,
            },
            {
                label: "Projects",
                href: "/admin-ferhat/projects",
                icon: FolderKanban,
            },
            {
                label: "Testimonials",
                href: "/admin-ferhat/testimonials",
                icon: Quote,
            },
            {
                label: "Pricing",
                href: "/admin-ferhat/pricing",
                icon: DollarSign,
            },
            {
                label: "Blog Posts",
                href: "/admin-ferhat/posts",
                icon: FileText,
            },
        ],
    },
    {
        label: "System",
        items: [
            { label: "Messages", href: "/admin-ferhat/messages", icon: Mail },
            {
                label: "Settings",
                href: "/admin-ferhat/settings",
                icon: SettingsIcon,
            },
        ],
    },
];

export default function AdminLayout({
    children,
    title,
    breadcrumbs,
    actions,
}: AdminLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    const url = usePage().url;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const isActive = (href: string, match?: RegExp) => {
        if (match) return match.test(url);
        const path = url.split("?")[0];
        return path === href || path.startsWith(href + "/");
    };

    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen bg-ink-950 text-ink-100">
                {/* Sidebar */}
                <aside
                    className={cn(
                        "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/5 bg-ink-900/60 backdrop-blur-2xl transition-transform lg:static lg:translate-x-0",
                        open ? "translate-x-0" : "-translate-x-full",
                    )}
                >
                    <div className="flex h-16 items-center justify-between border-b border-white/5 px-5">
                        <Link
                            href="/admin-ferhat"
                            className="flex items-center gap-2.5"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg font-bold text-ink-900 shadow-glow">
                                F
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white leading-tight">
                                    Admin
                                </p>
                                <p className="text-[10px] uppercase tracking-wider text-ink-300">
                                    Ferhat M.Y.
                                </p>
                            </div>
                        </Link>
                        <button
                            onClick={() => setOpen(false)}
                            className="lg:hidden text-ink-300 hover:text-white"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    </div>

                    <nav className="nice-scroll flex-1 space-y-6 overflow-y-auto px-3 py-5">
                        {navGroups.map((group) => (
                            <div key={group.label}>
                                <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-300">
                                    {group.label}
                                </p>
                                <div className="space-y-0.5">
                                    {group.items.map((item) => {
                                        const Icon = item.icon;
                                        const active = isActive(
                                            item.href,
                                            (item as any).match,
                                        );
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                                                    active
                                                        ? "bg-brand-500/15 text-brand-200 shadow-[inset_0_0_0_1px_rgba(255,122,26,0.25)]"
                                                        : "text-ink-100 hover:bg-white/5 hover:text-white",
                                                )}
                                            >
                                                <Icon
                                                    size={16}
                                                    className={
                                                        active
                                                            ? "text-brand-300"
                                                            : "text-ink-300"
                                                    }
                                                />
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="border-t border-white/5 p-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener"
                            className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-100 hover:bg-white/5 hover:text-white"
                        >
                            <ExternalLink size={16} className="text-ink-300" />
                            View Site
                        </a>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-100 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <LogOut size={16} />
                            Logout
                        </Link>
                    </div>
                </aside>

                {/* Backdrop on mobile */}
                {open && (
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
                    />
                )}

                {/* Main */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-white/5 bg-ink-900/60 px-5 backdrop-blur-2xl">
                        <div className="flex items-center gap-3 min-w-0">
                            <button
                                onClick={() => setOpen(true)}
                                className="text-ink-200 lg:hidden"
                            >
                                <Menu size={20} />
                            </button>
                            <div className="min-w-0">
                                <h1 className="truncate font-display text-lg font-semibold text-white">
                                    {title}
                                </h1>
                                {breadcrumbs && (
                                    <nav className="flex items-center gap-1.5 text-xs text-ink-300">
                                        {breadcrumbs.map((b, i) => (
                                            <span
                                                key={i}
                                                className="flex items-center gap-1.5"
                                            >
                                                {b.href ? (
                                                    <Link
                                                        href={b.href}
                                                        className="hover:text-brand-300"
                                                    >
                                                        {b.label}
                                                    </Link>
                                                ) : (
                                                    <span>{b.label}</span>
                                                )}
                                                {i < breadcrumbs.length - 1 && (
                                                    <span>/</span>
                                                )}
                                            </span>
                                        ))}
                                    </nav>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {actions}
                            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:flex">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-ink-900">
                                    {auth.user?.name?.[0]?.toUpperCase() || "A"}
                                </div>
                                <span className="text-xs font-medium text-ink-100">
                                    {auth.user?.name}
                                </span>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-5 lg:p-8">{children}</main>
                </div>
            </div>
        </>
    );
}
