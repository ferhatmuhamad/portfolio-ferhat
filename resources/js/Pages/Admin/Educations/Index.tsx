import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";
import { formatDateRange } from "@/lib/format";

interface Education {
    id: number;
    degree: string;
    institution: string;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
}

export default function EducationsIndex({
    educations,
}: {
    educations: Education[];
}) {
    return (
        <AdminLayout
            title="Education"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Education" },
            ]}
        >
            <DataTable
                data={educations}
                createHref={route("admin.educations.create")}
                createLabel="New Education"
                editHref={(r) => route("admin.educations.edit", r.id)}
                deleteHref={(r) => route("admin.educations.destroy", r.id)}
                columns={[
                    {
                        header: "Degree",
                        cell: (r) => (
                            <span className="font-semibold text-white">
                                {r.degree}
                            </span>
                        ),
                    },
                    {
                        header: "Institution",
                        cell: (r) => (
                            <span className="text-brand-300">
                                {r.institution}
                            </span>
                        ),
                    },
                    {
                        header: "Period",
                        cell: (r) => (
                            <span className="font-mono text-xs text-ink-300">
                                {formatDateRange(r.start_date, r.end_date)}
                            </span>
                        ),
                    },
                ]}
            />
        </AdminLayout>
    );
}
