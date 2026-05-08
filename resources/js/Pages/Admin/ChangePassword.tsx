import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Field, FormCard, Input } from "@/Components/admin/Form";
import { Save } from "lucide-react";

export default function ChangePassword() {
    const { data, setData, patch, processing, errors, reset } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        patch(route("admin.password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout
            title="Change Password"
            breadcrumbs={[
                { label: "Admin", href: "/admin-ferhat" },
                { label: "Change Password" },
            ]}
        >
            <div className="max-w-lg">
                <form onSubmit={submit}>
                    <FormCard
                        footer={
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary text-sm !px-5 !py-2.5"
                            >
                                <Save size={14} />
                                {processing ? "Saving…" : "Update Password"}
                            </button>
                        }
                    >
                        <h3 className="font-display text-base font-semibold text-white">
                            Change Password
                        </h3>
                        <p className="text-sm text-ink-300">
                            Use a strong password of at least 8 characters.
                        </p>

                        <Field
                            label="Current Password"
                            error={errors.current_password}
                            required
                        >
                            <Input
                                type="password"
                                autoComplete="current-password"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                placeholder="Enter your current password"
                            />
                        </Field>

                        <Field
                            label="New Password"
                            error={errors.password}
                            hint="Minimum 8 characters."
                            required
                        >
                            <Input
                                type="password"
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Enter new password"
                            />
                        </Field>

                        <Field
                            label="Confirm New Password"
                            error={errors.password_confirmation}
                            required
                        >
                            <Input
                                type="password"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                placeholder="Repeat new password"
                            />
                        </Field>
                    </FormCard>
                </form>
            </div>
        </AdminLayout>
    );
}
