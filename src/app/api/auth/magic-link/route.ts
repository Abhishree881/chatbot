import { NextRequest, NextResponse } from 'next/server';
import { stytchClient } from '@/lib/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const response = await stytchClient.magicLinks.email.loginOrCreate({
      email,
      login_magic_link_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      signup_magic_link_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    });

    return NextResponse.json({
      message: 'Magic Link sent successfully!',
      details: response,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
