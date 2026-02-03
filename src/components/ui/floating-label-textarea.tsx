// components/ui/floating-label-textarea.tsx
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FloatingLabelTextareaProps extends React.ComponentProps<"textarea"> {
  label: string;
}

const FloatingLabelTextarea = React.forwardRef<HTMLTextAreaElement, FloatingLabelTextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="relative">
        <Textarea
          ref={ref}
          id={inputId}
          className={cn(
            "peer block w-full px-3 py-1 pt-7 pb-2 text-base md:text-sm",
            "placeholder:text-transparent focus:placeholder:text-transparent",
            "min-h-[120px] resize-none",
            className
          )}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-3 top-4 z-10 origin-[0]",
            "cursor-text select-none px-1",
            "text-muted-foreground bg-background",
            "transition-all duration-200 ease-out",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",
            "peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-primary",
            "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:scale-75"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingLabelTextarea.displayName = "FloatingLabelTextarea";

export { FloatingLabelTextarea };