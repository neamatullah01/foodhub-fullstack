import { NextRequest, NextResponse } from "next/server"; // Ensure Roles.customer exists here!
import { Roles } from "./constants/roles";
import { getSession } from "./services/user.service";

// Note: In Next.js, this file should ideally be named `middleware.ts` at the root of your project (or inside `src/`).
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Fetch the session
  const { data } = await getSession();

  const isAuthenticated = !!data;
  const userRole = data?.user?.role;

  // 2. If not logged in, redirect to login page
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Define Roles
  const isCustomer = userRole === Roles.customer;

  // 4. Customer Route Protection
  // If the user is trying to access checkout but is NOT a customer
  if (pathname.startsWith("/checkout") && !isCustomer) {
    // Redirect admins or providers away from the customer checkout
    return NextResponse.redirect(new URL("/", request.url));
  }

  // You can easily add your Provider and Admin checks right here later:
  // if (pathname.startsWith("/admin-dashboard") && userRole !== Roles.admin) { ... }
  // if (pathname.startsWith("/provider-dashboard") && userRole !== Roles.provider) { ... }

  return NextResponse.next();
}

// 5. The Matcher
// This tells Next.js exactly which routes should trigger this file.
export const config = {
  matcher: [
    "/checkout",
    "/checkout/:path*",
    "/profile",
    "/orders",
    "/reviews",
    // Add any other customer-only routes here, like "/profile" or "/orders"
  ],
};
