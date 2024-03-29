import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
  try {
    const res = await fetch(`${process.env.DOMAIN}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    const data = await res.json();
    if (res.status === 401) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const response = NextResponse.next();
    response.cookies.set("accessToken", data.accessToken, {
      maxAge: 2 * 24 * 60 * 60,
      path: "/",
    });
    response.cookies.set("refreshToken", data.refreshToken, {
      maxAge: 2 * 24 * 60 * 60,
      path: "/",
    });
    return response;
  } catch (error) {}
}

export const config = {
  matcher: ["/todos/:path*", "/api/:path*", "/"],
};
