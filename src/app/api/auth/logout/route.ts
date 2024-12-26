import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '@/lib/sessionOptions';

export async function DELETE(req: Request) {
  try {
    const session = await getIronSession(req, new Response(), sessionOptions);

    session.destroy();

    const response = NextResponse.json({ message: 'Logout successful' });
    response.cookies.set('user_access_token', '', { maxAge: 0, path: '/' });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
