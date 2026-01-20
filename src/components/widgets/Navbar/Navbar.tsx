"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/Seller_Mama_Logo bg remove.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  Package,
  Shirt,
  Watch,
  Laptop,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";

const categories = [
  {
    title: "Electronics",
    description: "Latest gadgets and tech",
    items: [
      { name: "Laptops", icon: Laptop, href: "/category/laptops", tag: "New" },
      {
        name: "Smartphones",
        icon: Smartphone,
        href: "/category/smartphones",
        tag: "Hot",
      },
      { name: "Smartwatches", icon: Watch, href: "/category/watches" },
    ],
  },
  {
    title: "Fashion",
    description: "Trending styles for all",
    items: [
      { name: "Men's Collection", icon: Shirt, href: "/category/mens" },
      {
        name: "Women's Collection",
        icon: Shirt,
        href: "/category/womens",
        tag: "Sale",
      },
      { name: "Accessories", icon: Watch, href: "/category/accessories" },
    ],
  },
];

export default function Navbar() {
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* announcement  */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-center text-sm text-white">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">
            Free shipping on orders over $50 • Limited time offer!
          </span>
        </div>
      </div>
      {/* Main navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4 md:h-20">
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="relative">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full sm:w-[400px] p-0 [&>button]:hidden"
              >
                <DialogTitle className="sr-only">Menu</DialogTitle>
                <div className="flex h-full flex-col">
                  {/* Mobile menu header */}
                  <div className="flex items-center justify-between border-b px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={logo}
                        alt="Seller Mama Logo"
                        className="w-auto h-12 md:h-16"
                      />

                      <p>
                        <span className="block text-base font-extrabold tracking-wide leading-none bg-gradient-to-r from-pink-700 to-orange-500 bg-clip-text text-transparent md:text-2xl">
                          Seller Mama
                        </span>
                        <span className="text-[9px] text-gray-500">
                          YOUR TRUSTED MAMA IN EVERY DEAL.
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile menu content */}
                  <nav className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="space-y-6">
                      <Link
                        href="/"
                        className="block text-base font-semibold text-gray-900 hover:text-orange-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </Link>

                      <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Shop by Category
                        </p>
                        {categories.map((category) => (
                          <div key={category.title} className="space-y-3">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {category.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {category.description}
                              </p>
                            </div>
                            <div className="ml-3 space-y-2 border-l-2 border-orange-100 pl-4">
                              {category.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center justify-between gap-2 py-1 text-sm text-gray-700 hover:text-orange-500"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Icon className="h-4 w-4" />
                                      {item.name}
                                    </div>
                                    {item.tag && (
                                      <Badge
                                        variant="secondary"
                                        className="bg-orange-100 text-orange-700 text-xs"
                                      >
                                        {item.tag}
                                      </Badge>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <Link
                        href="/deals"
                        className="flex items-center gap-2 text-base font-semibold text-orange-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Sparkles className="h-4 w-4" />
                        Special Deals
                      </Link>

                      <div className="space-y-3">
                        <Link
                          href="/about"
                          className="block text-base font-medium text-gray-700 hover:text-orange-500"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          About Us
                        </Link>
                        <Link
                          href="/contact"
                          className="block text-base font-medium text-gray-700 hover:text-orange-500"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Contact
                        </Link>
                      </div>
                    </div>
                  </nav>

                  {/* Mobile menu footer */}
                  <div className="border-t px-6 py-4">
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Register
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-transform hover:scale-105"
            >
              <Image
                src={logo}
                alt="Seller Mama Logo"
                className="w-auto h-12 md:h-16"
              />

              <div className="leading-none">
                <span className="block text-base font-extrabold tracking-wide leading-none bg-gradient-to-r from-pink-700 to-orange-500 bg-clip-text text-transparent md:text-2xl">
                  Seller Mama
                </span>

                <span className="text-[9px] text-gray-500 leading-none">
                  YOUR TRUSTED MAMA IN EVERY DEAL.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-orange-50 hover:text-orange-600"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-lg hover:bg-orange-50 hover:text-orange-600">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[700px] p-6 border-none">
                      <div className="grid gap-6 md:grid-cols-2">
                        {categories.map((category) => (
                          <div key={category.title} className="space-y-4">
                            <div className="space-y-1">
                              <h4 className="text-base font-bold text-gray-900">
                                {category.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {category.description}
                              </p>
                            </div>
                            <div className="space-y-1">
                              {category.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center justify-between rounded-lg p-3 transition-all hover:bg-orange-50"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="rounded-lg bg-orange-100 p-2 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                                        <Icon className="h-5 w-5" />
                                      </div>
                                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                                        {item.name}
                                      </span>
                                    </div>
                                    {item.tag && (
                                      <Badge className="bg-orange-500 text-xs">
                                        {item.tag}
                                      </Badge>
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/deals"
                    className="group inline-flex h-10 w-max items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-orange-600 transition-all hover:bg-orange-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    Deals
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-orange-50 hover:text-orange-600"
                  >
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-orange-50 hover:text-orange-600"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search Bar - Desktop */}
            <div className="hidden flex-1 max-w-xl md:flex">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full rounded-full border-gray-200 bg-gray-50 pl-11 pr-4 transition-all focus:bg-white focus:shadow-md"
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search icon for mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden sm:flex"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* User account */}
              <Link href="/account">
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative transition-transform hover:scale-105"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="border-t py-3 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-full pl-10 pr-4"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
