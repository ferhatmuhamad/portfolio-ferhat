import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Glass } from "@/Components/ui/Glass";
import { formatDate } from "@/lib/format";
import { Mail, MailOpen, Trash2 } from "lucide-react";

interface Message {
    id: number;
    name: string;
    email: string;
    subject?: string;
    message: string;
    read_at: string | null;
    created_at: string;
}
interface Paginator<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
}

export default function MessagesIndex({
    messages,
}: {
    messages: Paginator<Message>;
}) {
    const remove = (id: number) => {
        if (confirm("Delete this message?"))
            router.delete(route("admin.messages.destroy", id));
    };

    return (
        <AdminLayout
            title="Messages"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Messages" },
            ]}
        >
            <div className="space-y-3">
                {messages.data.length === 0 && (
                    <Glass className="p-12 text-center text-ink-300">
                        <Mail className="mx-auto mb-3 opacity-50" size={32} />
                        No messages yet.
                    </Glass>
                )}
                {messages.data.map((m) => (
                    <Glass
                        key={m.id}
                        className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-5"
                    >
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${m.read_at ? "bg-white/5 text-ink-300" : "bg-brand-500/15 text-brand-300"}`}
                        >
                            {m.read_at ? (
                                <MailOpen size={16} />
                            ) : (
                                <Mail size={16} />
                            )}
                        </div>
                        <Link
                            href={route("admin.messages.show", m.id)}
                            className="min-w-0 flex-1"
                        >
                            <div className="flex items-baseline gap-2">
                                <p
                                    className={`truncate font-semibold ${m.read_at ? "text-ink-200" : "text-white"}`}
                                >
                                    {m.name}
                                </p>
                                <p className="truncate text-xs text-ink-400">
                                    · {m.email}
                                </p>
                            </div>
                            <p className="truncate text-sm font-medium text-ink-200">
                                {m.subject || "(no subject)"}
                            </p>
                            <p className="truncate text-xs text-ink-400">
                                {m.message}
                            </p>
                        </Link>
                        <span className="shrink-0 font-mono text-[11px] text-ink-400">
                            {formatDate(m.created_at)}
                        </span>
                        <button
                            onClick={() => remove(m.id)}
                            className="rounded-lg p-2 text-ink-400 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <Trash2 size={14} />
                        </button>
                    </Glass>
                ))}
            </div>

            {messages.links.length > 3 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {messages.links.map((l, i) =>
                        l.url ? (
                            <Link
                                key={i}
                                href={l.url}
                                preserveScroll
                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${l.active ? "border-brand-500 bg-brand-500/15 text-brand-300" : "border-white/10 text-ink-300 hover:bg-white/5"}`}
                                dangerouslySetInnerHTML={{ __html: l.label }}
                            />
                        ) : (
                            <span
                                key={i}
                                className="rounded-lg border border-white/5 px-3 py-1.5 text-xs text-ink-500"
                                dangerouslySetInnerHTML={{ __html: l.label }}
                            />
                        ),
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
