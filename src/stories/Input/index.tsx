import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "small" | "medium" | "large";
}

const Input = forwardRef<HTMLInputElement, InputProps>(({size = 'medium', ...props}, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        "w-full border border-gray-300 rounded-md",
        size === "small" && "text-sm px-2 py-1",
        size === "medium" && "text-base px-3 py-2",
        size === "large" && "text-lg px-4 py-3"
      )}
    />
  );
});

export default Input;
