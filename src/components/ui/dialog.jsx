import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

const Dialog = ({ open, onClose, title, description, children, className }) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            {title && (
              <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close dialog"
            className="h-8 w-8 rounded-lg -mt-1 -mr-1 text-slate-400 hover:text-slate-700"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export { Dialog };
