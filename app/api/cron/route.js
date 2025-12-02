import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {

  // 1. AUTH CHECK — secure your cron route
  const authHeader = req.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. WAKEUP DATABASE
  try {
    await db.user.findFirst(); // simple tiny query
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Wakeup DB Error:", error);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}
