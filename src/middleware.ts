import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken, verifyRefreshToken, generateTokens } from '@/utils/jwt';
import { cookies } from 'next/headers';

// List of public routes that don't require authentication
const publicRoutes = [
  '/api/auth/login',
  '/api/auth/refresh',
  '/api/auth/register',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if it's an API route
  if (pathname.startsWith('/api/')) {
    const accessToken = request.headers.get('Authorization')?.split(' ')[1];
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // If no access token, try to use refresh token
    if (!accessToken && refreshToken) {
      const payload = verifyRefreshToken(refreshToken);
      
      if (payload) {
        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(payload);
        
        // Create response with new access token
        const response = NextResponse.next();
        
        // Set new refresh token in cookie
        response.cookies.set('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        // Set new access token in response header
        response.headers.set('X-New-Access-Token', newAccessToken);
        
        return response;
      }
    }

    // Verify access token
    if (accessToken) {
      const payload = verifyAccessToken(accessToken);
      if (payload) {
        return NextResponse.next();
      }
    }

    // If both tokens are invalid or missing, return unauthorized
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized' }),
      { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // For non-API routes, proceed normally
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 