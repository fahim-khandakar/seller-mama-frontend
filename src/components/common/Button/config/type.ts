import { ButtonHTMLAttributes, ReactNode } from "react";
// button props
export type ButtonProps = {
  className?: string;
  sizeClass?: string;
  fontSize?: string;
  //
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => void;
  children?: ReactNode;
  link?: boolean;
  primary?: boolean;
  secondary?: boolean;
  ghost?: boolean;
  transparent?: boolean;
  dangerBgTransparent?: boolean;
  danger?: boolean;
  status?: boolean;
  icon?: ReactNode;
  edit?: boolean;
  mini?: boolean;
};
