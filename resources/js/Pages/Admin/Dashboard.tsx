import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import {
    Sparkles,
    Briefcase,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Mail,
    Star,
    Award,
    Users,
    BookOpen,
    GraduationCap,
    Code,
    Layers,
    Globe,
    Settings,
    BarChart3,
    FolderPlus,
    FilePlus,
    User,
    type LucideIcon,
} from "lucide-react";
import { formatDate } from "@/lib/format";

const ADMIN_ICON_MAP: Record<string, LucideIcon> = {
    Sparkles,
    Briefcase,
    FileText,
    Image: ImageIcon,
    MessageSquare,
    Mail,
    Star,
    Award,
    Users,
    BookOpen,
    GraduationCap,
    Code,
    Layers,
    Globe,
    Settings,
    BarChart3,
};

interface Stat {
    label: string;
    value: number;
    icon: string;
}
interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    created_at: string;
    is_read: boolean;
}

interface Props {
    stats: Stat[];
    recentMessages: Message[];
}

export default function Dashboard({ stats, recentMessages }: Props) {
    return (
        <AdminLayout
            title="Dashboard"
            breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]}
        >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {stats.map((s) => {
                    const Icon = ADMIN_ICON_MAP[s.icon] || Sparkles;
                    return (
                        <div
                            key={s.label}
                            className="rounded-2xl border border-white/10 bg-ink-900/40 p-5 backdrop-blur-md transition-all hover:border-brand-500/30 hover:shadow-glow"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-ink-300">
                                        {s.label}
                                    </p>
                                    <p className="mt-2 font-display text-3xl font-bold text-white">
                                        {s.value}
                                    </p>
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                                    <Icon size={18} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-ink-900/40 backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                        <h2 className="font-display text-base font-semibold text-white">
                            Recent Messages
                        </h2>
                        <Link
                            href="/admin-ferhat/messages"
                            className="text-xs font-semibold text-brand-300 hover:text-brand-200"
                        >
                            View all →
                        </Link>
                    </div>
                    <ul className="divide-y divide-white/5">
                        {recentMessages.length === 0 && (
                            <li className="px-5 py-10 text-center text-sm text-ink-300">
                                No messages yet.
                            </li>
                        )}
                        {recentMessages.map((m) => (
                            <li key={m.id}>
                                <Link
                                    href={`/admin-ferhat/messages/${m.id}`}
                                    className="flex items-start justify-between gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate font-semibold text-white">
                                                {m.name}
                                            </p>
                                            {!m.is_read && (
                                                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                                            )}
                                        </div>
                                        <p className="truncate text-xs text-ink-300">
                                            {m.subject || m.email}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-xs text-ink-300">
                                        {formatDate(m.created_at)}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-ink-900/40 p-5 backdrop-blur-md">
                    <h2 className="font-display text-base font-semibold text-white">
                        Quick Actions
                    </h2>
                    <p className="mt-1 text-xs text-ink-300">
                        Jump straight to common tasks.
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-2.5">
                        <QuickAction
                            href="/admin-ferhat/projects/create"
                            label="New Project"
                            icon={FolderPlus}
                        />
                        <QuickAction
                            href="/admin-ferhat/posts/create"
                            label="New Post"
                            icon={FilePlus}
                        />
                        <QuickAction
                            href="/admin-ferhat/profile"
                            label="Edit Profile"
                            icon={User}
                        />
                        <QuickAction
                            href="/admin-ferhat/settings"
                            label="Settings"
                            icon={Settings}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function QuickAction({
    href,
    label,
    icon: Icon,
}: {
    href: string;
    label: string;
    icon: any;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink-100 transition-all hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-200"
        >
            <Icon size={16} />
            {label}
        </Link>
    );
}
