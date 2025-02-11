/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { decodedToken } from "./shared/helpers/jwt";

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const authToken = cookies.get("accessToken")?.value;
  const user: any = authToken ? decodedToken(authToken) : null;
  const isLogged = !!authToken;

  const url = request.nextUrl.clone();
  if (!isLogged) {
    if (url.pathname.startsWith("/dashboard")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (isLogged && user?.role !== "admin") {
    const adminPaths = [
      "/dashboard/profile/admin-profile",
      "/dashboard/home",
      "/dashboard/post/admin-posts-list",
      "/dashboard/user/create-user",
      "/dashboard/user/create-admin",
      "/dashboard/user/user-list",
      "/dashboard/user/admin-list",
    ];

    if (adminPaths.some((path) => url.pathname.startsWith(path))) {
      url.pathname = "/dashboard/profile/my-profile";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
