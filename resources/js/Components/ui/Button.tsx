import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            leftIcon,
            rightIcon,
            children,
            ...props
        },
        ref,
    ) => {
        const cls = {
            primary: "btn-primary",
            ghost: "btn-ghost",
            light: "btn-light",
        }[variant];
        return (
            <button ref={ref} className={cn(cls, className)} {...props}>
                {leftIcon}
                <span>{children}</span>
                {rightIcon}
            </button>
        );
    },
);
Button.displayName = "Button";
