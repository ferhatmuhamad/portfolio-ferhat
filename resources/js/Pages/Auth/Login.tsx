import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { Field, Input, Checkbox } from "@/Components/admin/Form";

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-4 py-10">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-500/15 blur-[160px]" />
                    <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-sun-400/10 blur-[160px]" />
                </div>

                <div className="relative w-full max-w-md">
                    <div className="mb-7 text-center">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient font-display text-2xl font-bold text-ink-900 shadow-glow">
                            F
                        </div>
                        <h1 className="mt-5 font-display text-3xl font-bold text-white">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm text-ink-300">
                            Sign in to manage your portfolio.
                        </p>
                    </div>

                    <div className="glass-card relative p-8">
                        {status && (
                            <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                                <ShieldCheck size={16} />
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <Field label="Email" required error={errors.email}>
                                <div className="relative">
                                    <Mail
                                        size={16}
                                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300"
                                    />
                                    <Input
                                        type="email"
                                        autoComplete="username"
                                        autoFocus
                                        className="pl-10"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </Field>

                            <Field
                                label="Password"
                                required
                                error={errors.password}
                            >
                                <div className="relative">
                                    <Lock
                                        size={16}
                                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300"
                                    />
                                    <Input
                                        type="password"
                                        autoComplete="current-password"
                                        className="pl-10"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </Field>

                            <Checkbox
                                label="Remember me"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData(
                                        "remember",
                                        (e.target.checked || false) as false,
                                    )
                                }
                            />

                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary w-full justify-center"
                            >
                                {processing ? "Signing in…" : "Sign in"}
                            </button>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-xs text-ink-300">
                        Protected admin area · {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </>
    );
}
