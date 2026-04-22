import {
  BarChart3,
  Users,
  UserCheck,
  ShoppingCart,
  Package,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const items = [
  { title: 'Analytics', url: '/dashboard', icon: BarChart3 },
  { title: 'Users', url: '/dashboard/users', icon: Users },
  { title: 'Customers', url: '/dashboard/customers', icon: UserCheck },
  { title: 'Orders', url: '/dashboard/orders', icon: ShoppingCart },
  { title: 'Products', url: '/dashboard/products', icon: Package },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset" className="shadow-lg">
      <SidebarHeader className="flex items-end justify-end p-2">
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
