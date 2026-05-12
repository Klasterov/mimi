import Header from "@/components/layout/Header"
import CatalogHero from "@/components/sections/Catalog/CatalogHero"
import CatalogItems from "@/components/sections/Catalog/CatalogItems"
import CatalogBanner from "@/components/sections/Catalog/CatalogBanner"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"
import { getControllerCatalogItems } from "@/lib/controllers"

export const metadata = {
  title: routes.controller.title,
}

export default async function ControllerPage() {
  const items = await getControllerCatalogItems()

  return (
    <>
      <Header />
      <main>
        <CatalogHero
          title="Контроллеры"
          description="Это мозг системы. Они принимают сигналы от датчиков и панелей, запускают сценарии и управляют светом, климатом, шторами и безопасностью. Работают локально даже без интернета."
          image="/images/products/decor-4.png"
          imageWidth={349}
          imageHeight={438}
        />
        <CatalogItems title="Все оборудование" items={items} />
        <CatalogBanner
          title="Щит автоматизации"
          description="Каждая линия подписана, заложен резерв слотов и места под расширение. Аккуратный кабель-менеджмент, группировка автоматов и съемные клеммы упрощают обслуживание; перед сдачей проводим тестирование под нагрузкой."
          image="/images/products/decor-2.png"
          imageWidth={500}
          imageHeight={500}
        />
        <Showroom />
      </main>
      <Footer />
    </>
  )
}
