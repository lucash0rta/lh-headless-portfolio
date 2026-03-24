import type { Metadata } from 'next'
import PortfolioHome from '../../components/portfolio-home'

export const metadata: Metadata = {
  title: 'Lucas Horta Portfolio | Animator and Web Designer',
  description:
    'Professional portfolio of Lucas Horta, featuring animation, web design, and selected visual projects.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Lucas Horta Portfolio',
    description:
      'Professional portfolio of Lucas Horta, featuring animation, web design, and selected visual projects.',
    url: 'https://lucashorta.com/portfolio',
    siteName: 'Lucas Horta',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/lanyard.png',
        width: 1200,
        height: 630,
        alt: 'Lucas Horta portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucas Horta Portfolio',
    description:
      'Professional portfolio of Lucas Horta, featuring animation, web design, and selected visual projects.',
    images: ['/lanyard.png'],
  },
}

export default async function PortfolioPage() {
  return <PortfolioHome />
}
