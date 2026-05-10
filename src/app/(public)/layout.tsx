import Footer from '@/components/widgets/Footer/Footer';
import Navbar from '@/components/widgets/Navbar/Navbar';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
