import { NextResponse } from 'next/server';
import { stytchClient } from '@/lib/client'; 
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/sessionOptions';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const response = await stytchClient.magicLinks.authenticate( {
        token,
        session_duration_minutes: 60, 
    });

    const res = NextResponse.json({ message: 'Token verified successfully', session: response.user });

    const session: any = await getIronSession(req, res, sessionOptions);
    session.user_id = response.user.user_id;
    session.email = response.user.emails[0].email;
    await session.save();

    return res
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
