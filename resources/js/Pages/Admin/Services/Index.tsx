import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";

interface Service {
    id: number;
    title: string;
    icon?: string;
    order?: number;
    is_active: boolean;
}

export default function ServicesIndex({ services }: { services: Service[] }) {
    return (
        <AdminLayout
            title="Services"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Services" },
            ]}
        >
            <DataTable
                data={services}
                createHref={route("admin.services.create")}
                createLabel="New Service"
                editHref={(r) => route("admin.services.edit", r.id)}
                deleteHref={(r) => route("admin.services.destroy", r.id)}
                columns={[
                    {
                        header: "Title",
                        cell: (r) => (
                            <span className="font-semibold text-white">
                                {r.title}
                            </span>
                        ),
                    },
                    {
                        header: "Icon",
                        cell: (r) => (
                            <span className="font-mono text-xs text-ink-300">
                                {r.icon || "—"}
                            </span>
                        ),
                    },
                    { header: "Order", cell: (r) => r.order ?? 0 },
                    {
                        header: "Status",
                        cell: (r) => (
                            <span
                                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${r.is_active ? "bg-emerald-500/15 text-emerald-300" : "bg-ink-700/50 text-ink-300"}`}
                            >
                                {r.is_active ? "Active" : "Inactive"}
                            </span>
                        ),
                    },
                ]}
            />
        </AdminLayout>
    );
}
