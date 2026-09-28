import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!password || password.length < 4) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 4 characters' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userRecord = getUserByEmail(normalizedEmail);

    if (!userRecord) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'No account found with this email. Please register for a new account.' 
        },
        { status: 401 }
      );
    }

    if (userRecord.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Incorrect password. Please verify and try again.' },
        { status: 401 }
      );
    }

    // Return authenticated user without the password field
    const { password: _, ...cleanUser } = userRecord;

    const token = 'q_session_' + Buffer.from(`${cleanUser.id}:${Date.now()}`).toString('base64url');

    return NextResponse.json({
      success: true,
      message: 'Signed in successfully',
      user: cleanUser,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}
