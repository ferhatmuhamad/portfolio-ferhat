import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";
import { formatDateRange } from "@/lib/format";

interface Experience {
    id: number;
    role: string;
    company: string;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
}

export default function ExperiencesIndex({
    experiences,
}: {
    experiences: Experience[];
}) {
    return (
        <AdminLayout
            title="Experience"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Experience" },
            ]}
        >
            <DataTable
                data={experiences}
                createHref={route("admin.experiences.create")}
                createLabel="New Experience"
                editHref={(r) => route("admin.experiences.edit", r.id)}
                deleteHref={(r) => route("admin.experiences.destroy", r.id)}
                columns={[
                    {
                        header: "Role",
                        cell: (r) => (
                            <span className="font-semibold text-white">
                                {r.role}
                            </span>
                        ),
                    },
                    {
                        header: "Company",
                        cell: (r) => (
                            <span className="text-brand-300">{r.company}</span>
                        ),
                    },
                    {
                        header: "Period",
                        cell: (r) => (
                            <span className="text-xs font-mono text-ink-300">
                                {formatDateRange(r.start_date, r.end_date)}
                            </span>
                        ),
                    },
                    {
                        header: "Active",
                        cell: (r) => (r.is_active ? "✓" : "—"),
                    },
                ]}
            />
        </AdminLayout>
    );
}
