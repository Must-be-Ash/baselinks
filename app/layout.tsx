import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const viewport: Viewport = {
  themeColor: "#0052FF",
};

export const metadata: Metadata = {
  title: 'BaseLinks | Create Your Crypto Donation Page',
  description: 'Generate personalized .env files for your crypto donation links page. Set up your crypto donation page in 4 simple steps.',
  keywords: [
    "BaseLinks",
    "Crypto Donation",
    "CDP",
    "Coinbase Developer Platform",
    "Blockchain",
    "Web3",
    "Donation Page",
    "Environment Variables",
  ],
  authors: [{ name: "BaseLinks Team" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/logo.png' },
    ],
    other: [
      { 
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192'
      },
      { 
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512'
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "BaseLinks | Create Your Crypto Donation Page",
    description: "Generate personalized .env files for your crypto donation links page. Set up your crypto donation page in 4 simple steps.",
    url: "https://BaseLinks.xyz",
    siteName: "BaseLinks",
    type: "website",
    images: [
      {
        url: "https://BaseLinks.xyz/og.png",
        width: 1200,
        height: 630,
        alt: "BaseLinks - Create Your Crypto Donation Page",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BaseLinks | Create Your Crypto Donation Page",
    description: "Generate personalized .env files for your crypto donation links page. Set up your crypto donation page in 4 simple steps.",
    images: ["https://BaseLinks.xyz/og.png"],
  },
  metadataBase: new URL("https://BaseLinks.xyz"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="fc:miniapp"
          content='{"version":"1","imageUrl":"https://BaseLinks.xyz/og.png","button":{"title":"Open BaseLinks","action":{"type":"launch_frame","url":"https://BaseLinks.xyz","name":"BaseLinks"}}}'
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}