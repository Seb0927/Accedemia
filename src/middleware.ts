// Specify which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - .swa (Azure Static Web Apps)
     */
    "/((?!_next/static|_next/image|.swa/health|favicon.ico).*)",
  ],
};