export type CatalogItem = {
  id?: string | number
  image: {
    src: string
    width: number
    height: number
  }
  cap: string
  type?: string
  model?: string
  descr: string
  link: string
  fullDescription?: string
  specifications?: Array<{
    name: string
    unit: string
    value: string
  }>
  steps?: Array<{
    title: string
    content: string
  }>
}
