import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;
  
  // Check if the request is for the root path
  if (pathname === "/") {
    // Create a new URL for the redirect destination
    const url = request.nextUrl.clone();
    url.pathname = "/learn";
    
    // Return a redirect response
    return NextResponse.redirect(url);
  }
  
  // Return the original response for all other paths
  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - .swa (Azure Static Web Apps)
     */
    '/((?!_next/static|_next/image|.swa/health|favicon.ico).*)',
  ],
};