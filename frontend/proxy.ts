import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for verify-email route

  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // Check for session token in cookies

  const sessionToken = request.cookies.get(
    "__Secure-better-auth.session_token",
  );

  //* User is not authenticated at all

  if (!sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/reviews/:path*",
    "/provider/:path*",
    "/setup-profile",
    "/incomingOrders/:path*",
    "/menu/:path*",
    "/users/:path*",
    "/adminOrders/:path*",
    "/categories/:path*",
    "/dashboard/:path*",
  ],
};

// import { NextRequest, NextResponse } from "next/server";
// import { getSession } from "@/services/user.service";
// import { Roles } from "@/constants/roles";

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   const { data } = await getSession();

//   const isAuthenticated = !!data;
//   const userRole = data?.user?.role?.toUpperCase();

//   if (!isAuthenticated) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   const customerRoutes = ["/checkout", "/profile", "/orders", "/reviews"];
//   const providerRoutes = ["/provider", "/incomingOrders", "/menu"];
//   const adminRoutes = ["/users", "/adminOrders", "/categories"];
//   const dashboardRoutes = ["/dashboard"];

//   const isCustomer =
//     userRole === Roles.customer?.toUpperCase() || userRole === "CUSTOMER";
//   const isProvider =
//     userRole === Roles.provider?.toUpperCase() || userRole === "PROVIDER";
//   const isAdmin =
//     userRole === Roles.admin?.toUpperCase() || userRole === "ADMIN";

//   const isAttemptingCustomerRoute = customerRoutes.some((route) =>
//     pathname.startsWith(route),
//   );
//   if (isAttemptingCustomerRoute && !isCustomer) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   const isAttemptingProviderRoute = providerRoutes.some((route) =>
//     pathname.startsWith(route),
//   );
//   if (isAttemptingProviderRoute && !isProvider) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   const isAttemptingAdminRoute = adminRoutes.some((route) =>
//     pathname.startsWith(route),
//   );
//   if (isAttemptingAdminRoute && !isAdmin) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   const isAttemptingDashboardRoute = dashboardRoutes.some((route) =>
//     pathname.startsWith(route),
//   );
//   if (isAttemptingDashboardRoute && !isProvider && !isAdmin) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/checkout/:path*",
//     "/profile/:path*",
//     "/orders/:path*",
//     "/reviews/:path*",
//     "/provider/:path*",
//     "/setup-profile",
//     "/incomingOrders/:path*",
//     "/menu/:path*",
//     "/users/:path*",
//     "/adminOrders/:path*",
//     "/categories/:path*",
//     "/dashboard/:path*",
//   ],
// };
