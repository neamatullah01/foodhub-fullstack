import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constants/roles";
import { getSession } from "./services/user.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Fetch the session
  const { data } = await getSession();

  const isAuthenticated = !!data;
  const userRole = data?.user?.role?.toUpperCase(); // Good practice to normalize case

  // 2. If not logged in, redirect to login page
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Define Route Groups
  const customerRoutes = ["/checkout", "/profile", "/orders", "/reviews"];
  const providerRoutes = [
    "/provider",
    "/incomingOrders",
    "/menu",
    "/categories",
  ];
  // If admins and providers both share the "/dashboard" base URL:
  const dashboardRoutes = ["/dashboard"];

  // 4. Role Booleans
  const isCustomer =
    userRole === Roles.customer?.toUpperCase() || userRole === "CUSTOMER";
  const isProvider =
    userRole === Roles.provider?.toUpperCase() || userRole === "PROVIDER";
  const isAdmin =
    userRole === Roles.admin?.toUpperCase() || userRole === "ADMIN";

  // 5. Customer Route Protection
  const isAttemptingCustomerRoute = customerRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isAttemptingCustomerRoute && !isCustomer) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 6. Provider Route Protection
  const isAttemptingProviderRoute = providerRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isAttemptingProviderRoute && !isProvider) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 7. Shared Dashboard Protection (Provider & Admin only)
  const isAttemptingDashboardRoute = dashboardRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isAttemptingDashboardRoute && !isProvider && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 8. The Matcher
// Ensure ALL protected routes are listed here so Next.js knows to trigger this file!
export const config = {
  matcher: [
    /* --- Customer Routes --- */
    "/checkout/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/reviews/:path*",

    /* --- Provider Routes --- */
    "/provider/:path*",
    "/incomingOrders/:path*",
    "/menu/:path*",
    "/categories/:path*",

    /* --- Shared Dashboard Routes --- */
    "/dashboard/:path*",
  ],
};
