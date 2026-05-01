import {
    ReactNode,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    forwardRef,
} from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
    label: string;
    hint?: string;
    error?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
}

export function Field({
    label,
    hint,
    error,
    required,
    children,
    className,
}: FieldProps) {
    return (
        <label className={cn("block", className)}>
            <span className="mb-1.5 flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-ink-300">
                {label}
                {required && <span className="text-brand-400">*</span>}
            </span>
            {children}
            {hint && !error && (
                <span className="mt-1 block text-xs text-ink-300">{hint}</span>
            )}
            {error && (
                <span className="mt-1 block text-xs text-red-400">{error}</span>
            )}
        </label>
    );
}

export const Input = forwardRef<
    HTMLInputElement,
    InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <input ref={ref} className={cn("input-field", className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = forwardRef<
    HTMLTextAreaElement,
    TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, rows = 4, ...props }, ref) => (
    <textarea
        ref={ref}
        rows={rows}
        className={cn("input-field resize-y", className)}
        {...props}
    />
));
Textarea.displayName = "Textarea";

export function Select({
    className,
    children,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            className={cn("input-field appearance-none", className)}
            {...props}
        >
            {children}
        </select>
    );
}

export function Checkbox({
    label,
    ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <label className="inline-flex cursor-pointer items-center gap-2.5 select-none">
            <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-500 focus:ring-2 focus:ring-brand-500/40"
                {...props}
            />
            <span className="text-sm text-ink-100">{label}</span>
        </label>
    );
}

export function FormCard({
    children,
    footer,
}: {
    children: ReactNode;
    footer?: ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-ink-900/40 backdrop-blur-md">
            <div className="space-y-5 p-6">{children}</div>
            {footer && (
                <div className="flex items-center justify-end gap-2 border-t border-white/5 px-6 py-4">
                    {footer}
                </div>
            )}
        </div>
    );
}
