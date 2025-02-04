import { Home, ShoppingCart, Users, Settings, Shirt } from "lucide-react";

export const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Shirt, label: "Products", href: "/dashboard/products" },
  { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];
