import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crypto Donations Prompt Generator',
  description: 'Generate personalized prompts for adding crypto donations to your linktree',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#ffffff' }}>
        {children}
      </body>
    </html>
  )
}