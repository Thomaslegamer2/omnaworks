import { json } from "@/lib/auth/http";
import { getSessionPublicUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getSessionPublicUser();
  if (!user) {
    return json({ user: null }, 200);
  }
  return json({ user });
}
