import type React from "react";
import { Button as AntdButton } from "antd";
import clsx from "clsx";
import { ButtonProps, ButtonVariant } from "./config/type";

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
  outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-100",
  secondary:
    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-gray-100 hover:text-primary",
  link: "text-primary underline-offset-4 hover:underline",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "middle",
  asChild = false,
  className = "",
  children,
  type,
  ...props
}) => {
  const Comp = asChild ? "span" : AntdButton;

  // Combine custom and Ant Design's classes
  const customClassName = clsx(
    variantStyles[variant],
    size === "icon" && "h-9 w-9 p-0 flex items-center justify-center",
    className
  );

  return asChild ? (
    <span className={customClassName} {...props}>
      {children}
    </span>
  ) : (
    <Comp
      className={customClassName}
      size={size === "icon" ? "middle" : size} // Map "icon" to Ant Design's default size
      type={type}
      {...props}
    >
      {children}
    </Comp>
  );
};
