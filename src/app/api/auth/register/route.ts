import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, pass, city = 'Global', country = 'United States', vipCode = '' } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: 'Your full name is required' },
        { status: 400 }
      );
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Valid email address is required' },
        { status: 400 }
      );
    }

    if (!pass || pass.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const hasVipCode = vipCode && (vipCode.trim().toUpperCase() === 'QVIP10' || vipCode.trim().toUpperCase() === 'STUDIOQ');
    const tier: 'CLIENT' | 'OBSIDIAN VIP' = hasVipCode ? 'OBSIDIAN VIP' : 'CLIENT';

    const newUser = createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: pass,
      city: city.trim(),
      country: country.trim(),
      tier,
    });

    const token = 'q_session_' + Buffer.from(`${newUser.id}:${Date.now()}`).toString('base64url');

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
      token,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    const msg = error?.message?.includes('already exists')
      ? 'An account with this email already exists. Please sign in.'
      : (error?.message || 'Registration failed');

    return NextResponse.json(
      { success: false, message: msg },
      { status: 400 }
    );
  }
}
