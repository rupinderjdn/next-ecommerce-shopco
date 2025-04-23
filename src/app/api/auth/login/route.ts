import { NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { LoginCredentials } from '@/types/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const credentials: LoginCredentials = await request.json();

    // Validate input
    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const authResponse = await AuthService.validateUser(credentials);

    if (!authResponse) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Set refresh token in HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('refreshToken', authResponse.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    // Return access token and user data
    return NextResponse.json({
      user: authResponse.user,
      accessToken: authResponse.accessToken
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 