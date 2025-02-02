"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { MenuList } from "./MenuList";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import { Search, User } from "lucide-react";
import { getFromCookie } from "@/shared/helpers/localStorage";
import { authKey } from "@/shared/config/constants";
import { useGetMeQuery } from "@/redux/features/auth";

const data: NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Men's clothes",
        url: "/shop#men-clothes",
        description: "In attractive and spectacular colors and designs",
      },
      {
        id: 12,
        label: "Women's clothes",
        url: "/shop#women-clothes",
        description: "Ladies, your style and tastes are important to us",
      },
      {
        id: 13,
        label: "Kids clothes",
        url: "/shop#kids-clothes",
        description: "For all ages, with happy and beautiful colors",
      },
      {
        id: 14,
        label: "Bags and Shoes",
        url: "/shop#bag-shoes",
        description: "Suitable for men, women and all tastes and styles",
      },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "On Sale",
    url: "/shop#on-sale",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/shop#new-arrivals",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Brands",
    url: "/shop#brands",
    children: [],
  },
];

const TopNavbar = () => {
  const token = getFromCookie(authKey);
  const { data: user } = useGetMeQuery({ token });
  console.log("data", user);
  return (
    <nav className="sticky top-0 bg-white z-20">
      <div className="flex gap-5 relative max-w-7xl mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn([
              "text-2xl  lg:text-[32px]   font-extrabold whitespace-nowrap",
            ])}
          >
            Seller Mama
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex ">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <InputGroup className="hidden md:flex bg-[#F0F0F0] ">
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <InputGroup.Input
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden  p-1">
            <Search />
          </Link>
          <CartBtn />
          <Link
            href={user?.data?.role === "ADMIN" ? "/dashboard" : "/signin"}
            className="p-1"
          >
            <User />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
