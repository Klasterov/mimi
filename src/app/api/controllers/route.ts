import { NextResponse } from "next/server"

import { getControllerCatalogItems } from "@/lib/controllers"

export async function GET() {
  const items = await getControllerCatalogItems()

  return NextResponse.json({
    items,
  })
}
