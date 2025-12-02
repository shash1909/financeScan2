import { db } from "@/lib/prisma";
export async function GET() {
  try {
    await db.user.findFirst();
    return new Response("ok");
  } catch (err) {
    console.error("Wakeup error:", err);
    return new Response("error", { status: 500 });
  }
}
