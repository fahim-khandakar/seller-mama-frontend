"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { ButtonProps } from "./config/type";

const CustomButton: FC<ButtonProps> = ({
  className,
  sizeClass = "px-5 py-2",
  fontSize,
  disabled = false,
  children,
  mini,
  type = "button",
  loading,
  link,
  primary,
  secondary,
  ghost,
  transparent,
  dangerBgTransparent,
  danger,
  status,
  edit,
  icon,
  onClick = () => {},
}) => {
  const baseStyles = cn(
    "transition duration-300 flex items-center justify-center rounded-md font-medium",
    className,
    fontSize,
    sizeClass,
    disabled && "bg-gray-400 cursor-not-allowed text-white",
    mini && "!py-1 !px-2 !text-sm !h-7",
    loading && "cursor-not-allowed bg-gray-300"
  );

  const variants = cn(
    link && "text-blue-600 hover:text-blue-800 underline",
    primary && "bg-blue-600 text-white hover:bg-blue-700",
    secondary && "bg-gray-800 text-white hover:bg-gray-900",
    ghost &&
      "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100",
    transparent && "!px-0 !py-0",
    dangerBgTransparent &&
      "bg-transparent border border-red-400 text-red-600 hover:bg-red-100",
    danger && "bg-red-600 text-white hover:bg-red-700",
    status &&
      "bg-gray-200 text-gray-700 border border-gray-400 rounded-full text-xs",
    edit &&
      "bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100"
  );

  return (
    <Button
      disabled={disabled || loading}
      className={cn(baseStyles, variants)}
      onClick={onClick}
      type={type}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </Button>
  );
};

export default CustomButton;
