import { NextRequest, NextResponse } from "next/server";
import { rejectCrossOriginMutation } from "@/lib/request-security";
export function proxy(request: NextRequest) {
  return rejectCrossOriginMutation(request) || NextResponse.next();
}
export const config = { matcher: ["/api/admin/:path*", "/api/leads"] };
