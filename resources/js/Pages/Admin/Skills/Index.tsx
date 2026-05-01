import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";

interface Skill {
    id: number;
    name: string;
    category: string;
    level: number;
    order?: number;
    is_active: boolean;
}

export default function SkillsIndex({ skills }: { skills: Skill[] }) {
    return (
        <AdminLayout
            title="Skills"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Skills" },
            ]}
        >
            <DataTable
                data={skills}
                createHref={route("admin.skills.create")}
                createLabel="New Skill"
                editHref={(r) => route("admin.skills.edit", r.id)}
                deleteHref={(r) => route("admin.skills.destroy", r.id)}
                columns={[
                    {
                        header: "Name",
                        cell: (r) => (
                            <span className="font-semibold text-white">
                                {r.name}
                            </span>
                        ),
                    },
                    {
                        header: "Category",
                        cell: (r) => (
                            <span className="rounded-md bg-brand-500/10 px-2 py-0.5 text-xs text-brand-300">
                                {r.category}
                            </span>
                        ),
                    },
                    {
                        header: "Level",
                        cell: (r) => (
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full bg-brand-gradient"
                                        style={{ width: `${r.level}%` }}
                                    />
                                </div>
                                <span className="text-xs text-ink-300">
                                    {r.level}%
                                </span>
                            </div>
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
