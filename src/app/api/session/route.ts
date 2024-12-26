import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "@/lib/sessionOptions";

export async function GET(req: Request) {
  const session: any = await getIronSession(req, new Response(), sessionOptions);
  const user_id = session.user_id ?? null;
  const email = session.email ?? null;

  return new Response(JSON.stringify({ user_id, email }), {
    headers: { "Content-Type": "application/json" },
  });
}
