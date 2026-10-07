import Articles from "./Articles"
import { getArticles } from "@/lib/articles"
interface ArticlesWrapperProps {
  title: string
  mobileView?: "slider" | "stack"
}
export default async function ArticlesWrapper({ title, mobileView = "slider" }: ArticlesWrapperProps) {
  const articles = await getArticles()
  return <Articles title={title} articles={articles} mobileView={mobileView} />
}
