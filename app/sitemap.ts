import { MetadataRoute } from 'next';
import { ARTICULOS_BLOG_SEO } from '../lib/blogArticulos';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cabalgatasbogota.co';
  const fechaActual = new Date();

  const paginasPrincipales: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: fechaActual,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cabalgatas-la-calera`,
      lastModified: fechaActual,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: fechaActual,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: fechaActual,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const slugsSEO = [
    'planes-cabalgatas-bogota',
    'tour-cuatrimotos-bogota-la-calera',
    'cabalgata-romantica-parejas-bogota',
    'cabalgatas-ninos-familias-bogota',
    'cabalgata-vip-transporte-el-poblado-laureles',
    'alquiler-caballos-bogota-precios',
    'cabalgatas-grupos-empresas-bogota',
    'donde-montar-a-caballo-cerca-de-bogota',
    'en-horseback-riding-bogota-tours',
    'reservar',
    'consultar',
  ];

  const paginasSEO: MetadataRoute.Sitemap = slugsSEO.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: fechaActual,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const paginasBlog: MetadataRoute.Sitemap = ARTICULOS_BLOG_SEO.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: fechaActual,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...paginasPrincipales, ...paginasSEO, ...paginasBlog];
}
