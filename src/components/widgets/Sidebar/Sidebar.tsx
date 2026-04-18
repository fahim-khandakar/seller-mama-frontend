import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

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
  { title: 'Analytics', url: '#', icon: Home },
  { title: 'Users', url: '/dashboard/users', icon: Inbox },
  { title: 'Customers', url: '#', icon: Calendar },
  { title: 'Orders', url: '#', icon: Search },
  { title: 'Products', url: '#', icon: Settings },
  { title: 'Payments', url: '#', icon: Settings },
  { title: 'Stocks', url: '#', icon: Settings },
  { title: 'My Orders', url: '#', icon: Settings },
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
