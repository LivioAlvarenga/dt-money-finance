import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://seu.dominio.br',
      lastModified: new Date(),
    },
    {
      url: 'https://seu.dominio.br/sobre-nos',
      lastModified: new Date(),
    },
  ]
}
