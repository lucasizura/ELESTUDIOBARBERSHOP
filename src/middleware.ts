import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (err) {
    // Never let session refresh fail the entire request.
    console.error('[middleware] updateSession failed', err);
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    // Run on all pages except static assets, images, _next internals.
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)'
  ]
};
