import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-[0.99]",
        dark:
          "bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md active:scale-[0.99]",
        light:
          "bg-white text-slate-900 shadow-sm hover:bg-slate-100 hover:shadow-md active:scale-[0.99]",
        outline:
          "border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        subtle:
          "bg-blue-50 text-blue-700 hover:bg-blue-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-sm",
        xl: "h-12 rounded-xl px-7 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
