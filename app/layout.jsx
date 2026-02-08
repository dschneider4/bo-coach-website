// app/layout.jsx
import './globals.css'

export const metadata = {
  title: 'Bo Coach - ADHD Homework Helper',
  description: 'A pocket-sized executive functioning coach powered by AI and behavioral science. Transform homework battles into peaceful afternoons.',
  keywords: 'ADHD, homework helper, executive function, behavioral coaching, AI assistant, education technology',
  openGraph: {
    title: 'Bo Coach - ADHD Homework Helper',
    description: 'Transform homework battles into peaceful afternoons with AI-powered behavioral coaching',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}