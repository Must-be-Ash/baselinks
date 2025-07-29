import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import MobileDetector from './components/MobileDetector'

export const viewport: Viewport = {
  themeColor: "#0052FF",
};

export const metadata: Metadata = {
  title: 'tip-chain | Create Your Crypto Donation Page',
  description: 'Generate personalized .env files for your crypto donation links page. Set up your crypto donation page in 4 simple steps.',
  keywords: [
    "tip-chain",
    "Crypto Donation",
    "CDP",
    "Coinbase Developer Platform",
    "Blockchain",
    "Web3",
    "Donation Page",
    "Environment Variables",
  ],
  authors: [{ name: "tip-chain" }],
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
    title: "tip-chain | Create Your Crypto Donation Page",
    description: "Generate personalized .env files for your crypto donation links page. Set up your crypto donation page in 4 simple steps.",
    url: "https://tip-chain.com",
    siteName: "tip-chain",
    type: "website",
    images: [
      {
        url: "https://tip-chain.com/og.png",
        width: 1200,
        height: 630,
        alt: "tip-chain - Create Your Crypto Donation Page",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "tip-chain | Create Your Crypto Donation Page",
    description: "Generate personalized .env files for your crypto donation links page. Set up your crypto donation page in 4 simple steps.",
    images: ["https://tip-chain.com/og.png"],
  },
  metadataBase: new URL("https://tip-chain.com"),
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
          content='{"version":"1","imageUrl":"https://tip-chain.com/og.png","button":{"title":"Open tip-chain","action":{"type":"launch_frame","url":"https://tip-chain.com","name":"tip-chain"}}}'
        />
      </head>
      <body className="antialiased">
        <MobileDetector>
          {children}
        </MobileDetector>
        <Analytics />
      </body>
    </html>
  )
}