import AdminLayout from "@/Layouts/AdminLayout";
import { DataTable } from "@/Components/admin/DataTable";
import { formatCurrency } from "@/lib/format";

interface Plan {
    id: number;
    name: string;
    price: number | null;
    currency: string;
    billing_period?: string;
    is_popular: boolean;
    is_active: boolean;
}

export default function PricingIndex({ plans }: { plans: Plan[] }) {
    return (
        <AdminLayout
            title="Pricing Plans"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Pricing" },
            ]}
        >
            <DataTable
                data={plans}
                createHref={route("admin.pricing.create")}
                createLabel="New Plan"
                editHref={(r) => route("admin.pricing.edit", r.id)}
                deleteHref={(r) => route("admin.pricing.destroy", r.id)}
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
                        header: "Price",
                        cell: (r) => (
                            <span className="font-mono text-brand-300">
                                {r.price
                                    ? formatCurrency(r.price, r.currency)
                                    : "Custom"}
                            </span>
                        ),
                    },
                    {
                        header: "Period",
                        cell: (r) => (
                            <span className="text-xs text-ink-300">
                                {r.billing_period || "—"}
                            </span>
                        ),
                    },
                    {
                        header: "Popular",
                        cell: (r) => (r.is_popular ? "★" : "—"),
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
