import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({
    className,
    children,
    ...props
}, ref) => {
    return (
        <button
            className={cn(
                `
                w-auto
                rounded-fill
                bg-black
                border-transparent
                px-5
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                text-white
                font-semibold
                hover:opacity-75
                transition
                `,
                className
            )}
            ref={ref}
            {...props} // Now includes `disabled`, `type`, and all other button attributes
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
