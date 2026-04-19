'use client';

import { AppSidebar } from '@/components/widgets/Sidebar/Sidebar';

import ReduxProvider from '@/redux/reduxProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <ReduxProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <main className="flex-1 flex flex-col min-w-0">
              <div className="p-4">{children}</div>
            </main>
          </div>
        </ReduxProvider>
      </TooltipProvider>
    </SidebarProvider>
  );
}
