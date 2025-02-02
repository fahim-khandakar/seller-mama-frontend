"use client";

import { usePathname } from "next/navigation";
import { useGetMeQuery } from "@/redux/features/auth";
import Link from "next/link";
import Image from "next/image";
import { sidebarData } from "./config/constant";
import { getFromCookie } from "@/shared/helpers/localStorage";
import { authKey, demoLogo } from "@/shared/config/constants";

const Sidebar = () => {
  const router = usePathname();
  const token = getFromCookie(authKey);

  const { data } = useGetMeQuery({ token }, { skip: !token });

  return (
    <aside className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 w-72 pt-8 pb-4 px-4 flex flex-col shadow-xl">
      {/* Logo & User Info */}
      <div className="mb-5">
        <Link href="/" className="flex justify-center items-center">
          <div className="flex items-center gap-4 shadow-lg bg-gradient-to-b from-gray-600 to-gray-700 p-3 rounded-lg">
            <Image
              src={data?.data?.details?.profileImage || demoLogo}
              alt="User Image"
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <h1 className="font-semibold tracking-wide min-w-40 uppercase">
                {data?.data?.name || "User Name"}
              </h1>
              <p className="text-sm text-gray-400 uppercase">
                {data?.data?.role || "Designation"}
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 pr-2 max-h-[calc(100vh-200px)] pb-5 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarData.map((item) => {
            if (data?.data?.role !== "ADMIN") return null; // Restrict to admin
            const isActive = router === item.to;

            return (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="mr-3 text-xl" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-center text-gray-500">
          © 2025 Seller Mama. All rights reserved.
        </p>
        <a
          href="https://fahim-khandakar.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-blue-400 hover:text-blue-300 text-sm mt-2"
        >
          Developed by Fahim Khandakar
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
