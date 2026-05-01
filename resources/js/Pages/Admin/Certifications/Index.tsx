import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";
import { formatDate } from "@/lib/format";

interface Cert {
    id: number;
    title: string;
    issuer: string;
    issued_at: string;
    image_url?: string;
    is_active: boolean;
}

export default function CertificationsIndex({
    certifications,
}: {
    certifications: Cert[];
}) {
    return (
        <AdminLayout
            title="Certifications"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Certifications" },
            ]}
        >
            <DataTable
                data={certifications}
                createHref={route("admin.certifications.create")}
                createLabel="New Certification"
                editHref={(r) => route("admin.certifications.edit", r.id)}
                deleteHref={(r) => route("admin.certifications.destroy", r.id)}
                columns={[
                    {
                        header: "Title",
                        cell: (r) => (
                            <div className="flex items-center gap-3">
                                {r.image_url ? (
                                    <img
                                        src={r.image_url}
                                        className="h-10 w-10 rounded-lg border border-white/10 object-cover"
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-lg bg-brand-500/15" />
                                )}
                                <span className="font-semibold text-white">
                                    {r.title}
                                </span>
                            </div>
                        ),
                    },
                    {
                        header: "Issuer",
                        cell: (r) => (
                            <span className="text-brand-300">{r.issuer}</span>
                        ),
                    },
                    {
                        header: "Issued",
                        cell: (r) => (
                            <span className="text-xs font-mono text-ink-300">
                                {formatDate(r.issued_at)}
                            </span>
                        ),
                    },
                ]}
            />
        </AdminLayout>
    );
}
