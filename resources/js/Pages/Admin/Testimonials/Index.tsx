import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";
import { Star } from "lucide-react";

interface T {
    id: number;
    name: string;
    role: string;
    company?: string;
    rating: number;
    avatar_url?: string;
    is_active: boolean;
}

export default function TestimonialsIndex({
    testimonials,
}: {
    testimonials: T[];
}) {
    return (
        <AdminLayout
            title="Testimonials"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Testimonials" },
            ]}
        >
            <DataTable
                data={testimonials}
                createHref={route("admin.testimonials.create")}
                createLabel="New Testimonial"
                editHref={(r) => route("admin.testimonials.edit", r.id)}
                deleteHref={(r) => route("admin.testimonials.destroy", r.id)}
                columns={[
                    {
                        header: "Person",
                        cell: (r) => (
                            <div className="flex items-center gap-3">
                                {r.avatar_url ? (
                                    <img
                                        src={r.avatar_url}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-bold text-ink-900">
                                        {r.name[0]}
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold text-white">
                                        {r.name}
                                    </p>
                                    <p className="text-xs text-ink-300">
                                        {[r.role, r.company]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </p>
                                </div>
                            </div>
                        ),
                    },
                    {
                        header: "Rating",
                        cell: (r) => (
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={
                                            i < r.rating
                                                ? "fill-sun-400 text-sun-400"
                                                : "text-ink-700"
                                        }
                                    />
                                ))}
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
