import { NextRequest, NextResponse } from 'next/server';
import { createDbVipPass } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, city = 'Global' } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const pass = await createDbVipPass(email, city);

    return NextResponse.json({
      success: true,
      message: pass.alreadyRegistered
        ? 'Welcome back. Your existing VIP Pass is active.'
        : 'VIP Early Access Pass generated successfully and stored.',
      pass,
    });
  } catch (error) {
    console.error('VIP Pass error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not generate VIP pass' },
      { status: 500 }
    );
  }
}
