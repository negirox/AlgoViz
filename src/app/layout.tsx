import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AlgoViz: Interactive Algorithm Visualization Tool',
  description: 'Learn and visualize sorting, searching, and data structure algorithms like Bubble Sort, Quick Sort, Binary Search, and Hashing step-by-step. An interactive educational tool for students and developers.',
  keywords: 'algorithm visualization, sorting algorithms, searching algorithms, data structures, computer science, education, quick sort, merge sort, binary search, hashing, tree traversal',
  authors: [{ name: 'Mukesh Singh Negi', url: 'https://github.com/negirox' }],
  metadataBase: new URL(SITE_URL),
  // Social preview images come from app/opengraph-image.tsx and app/twitter-image.tsx.
  openGraph: {
    title: 'AlgoViz: Interactive Algorithm Visualization Tool',
    description: 'See algorithms in action. A step-by-step visual guide to understanding complex computer science concepts.',
    url: SITE_URL,
    siteName: 'AlgoViz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoViz: Interactive Algorithm Visualization Tool',
    description: 'Visualize algorithms like Quick Sort, Binary Search, and more. The best way to learn and prepare for coding interviews.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9187440931404634" />
        <meta name="google-site-verification" content="Ho2zcxC6OxfZE7x7sKnI0PfZHMuQpwYWvmnmjAdcUqg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9187440931404634"
          crossOrigin="anonymous"></script>
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
