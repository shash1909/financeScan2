// app/api/wakeup/route.js
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    await db.user.findFirst(); // tiny query to wake DB
    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("Wakeup error:", err);
    return new Response("error", { status: 500 });
  }
}
