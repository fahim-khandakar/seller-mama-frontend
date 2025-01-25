export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "small" | "middle" | "large" | "icon";

// Exclude conflicting properties

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  type?: "default" | "link" | "text" | "primary" | "dashed";
  children: React.ReactNode;
  className?: string;
}
