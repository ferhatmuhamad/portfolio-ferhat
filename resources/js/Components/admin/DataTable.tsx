import { Link, router } from "@inertiajs/react";
import { ReactNode } from "react";
import { Edit3, Trash2, Plus } from "lucide-react";

export interface Column<T> {
    header: string;
    cell: (row: T) => ReactNode;
    className?: string;
}

interface Props<T extends { id: number }> {
    columns: Column<T>[];
    data: T[];
    editHref?: (row: T) => string;
    deleteHref?: (row: T) => string;
    confirmText?: string;
    emptyText?: string;
    createHref?: string;
    createLabel?: string;
}

export function DataTable<T extends { id: number }>({
    columns,
    data,
    editHref,
    deleteHref,
    confirmText = "Delete this item?",
    emptyText = "No records yet.",
    createHref,
    createLabel = "Create",
}: Props<T>) {
    const handleDelete = (href: string) => {
        if (!confirm(confirmText)) return;
        router.delete(href, { preserveScroll: true });
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-ink-900/40 backdrop-blur-md">
            {createHref && (
                <div className="flex items-center justify-end border-b border-white/5 px-4 py-3">
                    <Link
                        href={createHref}
                        className="btn-primary text-sm !px-4 !py-2"
                    >
                        <Plus size={14} />
                        {createLabel}
                    </Link>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="border-b border-white/5 text-left">
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-ink-300 ${col.className || ""}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                            {(editHref || deleteHref) && (
                                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-ink-300">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="px-5 py-16 text-center text-sm text-ink-300"
                                >
                                    {emptyText}
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.id}
                                    className="transition-colors hover:bg-white/[0.02]"
                                >
                                    {columns.map((col, i) => (
                                        <td
                                            key={i}
                                            className={`px-5 py-4 align-middle ${col.className || ""}`}
                                        >
                                            {col.cell(row)}
                                        </td>
                                    ))}
                                    {(editHref || deleteHref) && (
                                        <td className="px-5 py-4 text-right">
                                            <div className="inline-flex items-center gap-1">
                                                {editHref && (
                                                    <Link
                                                        href={editHref(row)}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-ink-200 hover:border-brand-500/40 hover:text-brand-300"
                                                    >
                                                        <Edit3 size={14} />
                                                    </Link>
                                                )}
                                                {deleteHref && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                deleteHref(row),
                                                            )
                                                        }
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-ink-200 hover:border-red-500/40 hover:text-red-300"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
