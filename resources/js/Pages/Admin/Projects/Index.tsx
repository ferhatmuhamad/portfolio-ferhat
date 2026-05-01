import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";

interface Project {
    id: number;
    title: string;
    category: string;
    cover_url?: string;
    is_featured: boolean;
    is_active: boolean;
}

export default function ProjectsIndex({ projects }: { projects: Project[] }) {
    return (
        <AdminLayout
            title="Projects"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Projects" },
            ]}
        >
            <DataTable
                data={projects}
                createHref={route("admin.projects.create")}
                createLabel="New Project"
                editHref={(r) => route("admin.projects.edit", r.id)}
                deleteHref={(r) => route("admin.projects.destroy", r.id)}
                columns={[
                    {
                        header: "Project",
                        cell: (r) => (
                            <div className="flex items-center gap-3">
                                {r.cover_url ? (
                                    <img
                                        src={r.cover_url}
                                        className="h-12 w-16 rounded-lg border border-white/10 object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-16 rounded-lg bg-brand-500/10" />
                                )}
                                <div>
                                    <p className="font-semibold text-white">
                                        {r.title}
                                    </p>
                                    <p className="text-xs text-ink-300">
                                        {r.category}
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                    {
                        header: "Featured",
                        cell: (r) =>
                            r.is_featured ? (
                                <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-bold text-brand-300">
                                    FEATURED
                                </span>
                            ) : (
                                "—"
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
