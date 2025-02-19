import React from "react";
import { twMerge } from "tailwind-merge";

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const statusClass = "text-white flex justify-center items-center";
  const sizeClass =
    size === "sm"
      ? "px-2 py-1 text-xs rounded-md"
      : size === "md"
      ? "px-3 py-1 text-sm rounded-lg"
      : "px-4 py-2 text-lg rounded-xl";
  switch (variant) {
    case "default":
      return (
        <div
          className={twMerge(statusClass, sizeClass, "bg-gray-300", className)}
        >
          {children}
        </div>
      );
    case "primary":
      return (
        <div
          className={twMerge(statusClass, sizeClass, "bg-blue-500", className)}
        >
          {children}
        </div>
      );
    case "secondary":
      return (
        <div
          className={twMerge(statusClass, sizeClass, "bg-sky-900", className)}
        >
          {children}
        </div>
      );
    case "success":
      return (
        <div
          className={twMerge(statusClass, sizeClass, "bg-green-500", className)}
        >
          {children}
        </div>
      );
    case "warning":
      return (
        <div
          className={twMerge(
            statusClass,
            sizeClass,
            "bg-orange-500",
            className
          )}
        >
          {children}
        </div>
      );
    case "error":
      return (
        <div
          className={twMerge(statusClass, sizeClass, "bg-red-500", className)}
        >
          {children}
        </div>
      );
    default:
      return null;
  }
}
