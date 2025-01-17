import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /app and /app/* to app.ferien-planung.de
  if (pathname.startsWith('/app')) {
    const newPath = pathname.replace('/app', '');
    return NextResponse.redirect(`https://app.ferien-planung.de${newPath}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
}; 