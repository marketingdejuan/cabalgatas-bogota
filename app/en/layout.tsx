import type { Metadata } from "next";

const URL_SITIO = 'https://cabalgatasbogota.co';

export const metadata: Metadata = {
  title: 'Horseback Riding in Bogotá | Private & Eco Tours',
  description: 'Disconnect from the city and enjoy an ecological horseback riding experience in the mountains of La Calera, Cundinamarca (40 mins from Bogotá). Medical insurance included.',
  keywords: 'horseback riding bogota, horse tours bogota, eco tours cundinamarca, ride horses colombia, things to do in bogota',
  alternates: {
    canonical: `${URL_SITIO}/en`,
    languages: {
      'es-CO': URL_SITIO,
      'en-US': `${URL_SITIO}/en`,
      'x-default': URL_SITIO,
    },
  },
  openGraph: {
    title: 'Horseback Riding in Bogotá | Private & Eco Tours',
    description: 'The best ecological horseback riding experience near Bogotá. Gentle horses, mountain views, and full medical insurance.',
    url: `${URL_SITIO}/en`,
    siteName: 'Bogotá Horseback Riding',
    locale: 'en_US',
    type: 'website',
  },
};

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}