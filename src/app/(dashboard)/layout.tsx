'use client';

import { AppSidebar } from '@/components/widgets/Sidebar/Sidebar';
import '../globals.css';
import { Geist, Geist_Mono } from 'next/font/google';

import ReduxProvider from '@/redux/reduxProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <TooltipProvider>
            <ReduxProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1">{children}</main>
              </div>
            </ReduxProvider>
          </TooltipProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
