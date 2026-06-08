import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request:NextRequest) {
    const {response, sb_user} = await updateSession(request);

    const isAuthPage = request.nextUrl.pathname.startsWith("/login");
    const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");

    const {
        data: {user}
    } = sb_user;
    

    if (isDashboardPage && !user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthPage && user) {
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        );
    }

    return response;
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"]
};