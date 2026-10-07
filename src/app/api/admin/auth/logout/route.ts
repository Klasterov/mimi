import { NextRequest, NextResponse } from "next/server"

import { sessionCookieName } from "@/lib/admin-auth"

export async function POST(_request: NextRequest) {


  const response = NextResponse.json({ ok: true })

  response.cookies.set({
    name: sessionCookieName(),
    value: "",
    path: "/",
    maxAge: 0,
  })

  response.cookies.set({ name: "mimi_backend_token", value: "", path: "/", httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 0 })
  return response
}
