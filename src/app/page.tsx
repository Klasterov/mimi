import Header from "@/components/layout/Header";
import SmartHome from "@/components/sections/SmartHome";
import Comfort from "@/components/sections/Comfort";
import Capabilities from "@/components/sections/Home/Capabilities";
import Solutions from "@/components/sections/Solutions";
import Advantages from "@/components/sections/Advantages";
import Features from "@/components/sections/Features";
import Showroom from "@/components/sections/common/Showroom";
import Cases from "@/components/sections/Cases";
import ArticlesWrapper from "@/components/sections/ArticlesWrapper";
import Footer from "@/components/layout/Footer";
import { getProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Header />
      <main>
        <SmartHome />
        <Comfort />
        <Capabilities />
        <Solutions />
        <Advantages />
        <Features title="Удобное управление" />
        <Showroom />
        <Cases
          title="Кейсы"
          hasFilter
          theme="dark"
          items={projects}
        />
        <ArticlesWrapper title="Полезные статьи" />
      </main>
      <Footer />
    </>
  );
}
