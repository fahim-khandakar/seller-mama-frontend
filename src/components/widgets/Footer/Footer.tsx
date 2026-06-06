import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/Seller_Mama_Logo bg remove.png';
import { Facebook, Instagram } from 'lucide-react';

const links = [
  {
    group: 'Shop',
    items: [
      { title: 'All Products', href: '/shop' },
      { title: 'New Arrivals', href: '/shop' },
      { title: 'Best Sellers', href: '/shop' },
      { title: 'Offers', href: '/shop' },
    ],
  },
  {
    group: 'Company',
    items: [
      { title: 'About Us', href: '/about' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  {
    group: 'Support',
    items: [
      { title: 'Help Center', href: '/contact' },
      { title: 'Shipping Info', href: '/about' },
      { title: 'Returns Policy', href: '/about' },
    ],
  },
  {
    group: 'Legal',
    items: [
      { title: 'Privacy Policy', href: '#' },
      { title: 'Terms & Conditions', href: '#' },
    ],
  },
];
const socialLinks = [
  // { label: 'X', href: '#', icon: Twitter }, // X (Twitter)
  // { label: 'LinkedIn', href: '#', icon: Linkedin },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/sellermamaclothing',
    icon: Facebook,
  },
  // { label: 'Threads', href: '#', icon: MessageCircle }, // Closest match
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sellermamaclothing',
    icon: Instagram,
  },
  // { label: 'TikTok', href: '#', icon: Music }, // Closest match
];

export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" aria-label="Go home" className="inline-block">
              <Image
                src={logo}
                alt="Seller Mama Logo"
                className="w-auto h-20 md:h-32"
              />
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Seller Mama creates high-quality jerseys and sportswear designed
              for performance, durability, and style.
            </p>
          </div>

          {/* Links */}
          <nav className="lg:col-span-3 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {links.map((group) => (
              <div key={group.group} className="space-y-4 text-sm">
                <p className="font-semibold text-foreground">{group.group}</p>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground transition hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-6 border-t pt-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Seller Mama. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition hover:text-primary"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
