import Header from "@/components/layout/Header"
import CatalogHero from "@/components/sections/Catalog/CatalogHero"
import CatalogItems from "@/components/sections/Catalog/CatalogItems"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"
import { getControllerCatalogItems } from "@/lib/controllers"

export const metadata = {
  title: routes.Catalog.title,
}

export default async function CatalogPage() {
  const items = await getControllerCatalogItems()

  return (
    <>
      <Header />
      <main>
        <CatalogHero
          title="Каталог"
          description="Это мозг системы. Они принимают сигналы от датчиков и панелей, запускают сценарии и управляют светом, климатом, шторами и безопасностью. Работают локально даже без интернета."
          image="/images/products/decor.png"
          imageWidth={310}
          imageHeight={359}
          imageClassName="max-md:-mb-20"
        />
        <CatalogItems title="Контроллеры" items={items} />
      </main>
      <Footer />
    </>
  )
}
