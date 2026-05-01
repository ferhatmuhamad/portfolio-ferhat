import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Glass } from "@/Components/ui/Glass";
import { formatDate } from "@/lib/format";
import { ArrowLeft, Mail, Phone, Trash2 } from "lucide-react";

interface Message {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    read_at: string | null;
    created_at: string;
}

export default function ShowMessage({ message }: { message: Message }) {
    const remove = () => {
        if (confirm("Delete this message?"))
            router.delete(route("admin.messages.destroy", message.id));
    };

    return (
        <AdminLayout
            title={message.subject || "Message"}
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Messages", href: route("admin.messages.index") },
                { label: message.name },
            ]}
            actions={
                <>
                    <Link
                        href={route("admin.messages.index")}
                        className="btn-ghost text-sm !px-4 !py-2"
                    >
                        <ArrowLeft size={14} />
                        Back
                    </Link>
                    <button
                        onClick={remove}
                        className="btn-ghost text-sm !px-4 !py-2 text-red-300 hover:!bg-red-500/10"
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>
                </>
            }
        >
            <Glass className="space-y-6 p-8">
                <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="font-display text-xl font-bold text-white">
                            {message.name}
                        </h2>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-ink-300">
                            <a
                                href={`mailto:${message.email}`}
                                className="flex items-center gap-1.5 hover:text-brand-300"
                            >
                                <Mail size={13} />
                                {message.email}
                            </a>
                            {message.phone && (
                                <a
                                    href={`tel:${message.phone}`}
                                    className="flex items-center gap-1.5 hover:text-brand-300"
                                >
                                    <Phone size={13} />
                                    {message.phone}
                                </a>
                            )}
                        </div>
                    </div>
                    <span className="font-mono text-xs text-ink-400">
                        {formatDate(message.created_at)}
                    </span>
                </header>
                {message.subject && (
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                            Subject
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">
                            {message.subject}
                        </p>
                    </div>
                )}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                        Message
                    </p>
                    <p className="mt-2 whitespace-pre-wrap leading-relaxed text-ink-100">
                        {message.message}
                    </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                    <a
                        href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject || "")}`}
                        className="btn-primary text-sm !px-5 !py-2.5"
                    >
                        <Mail size={14} />
                        Reply via Email
                    </a>
                </div>
            </Glass>
        </AdminLayout>
    );
}
