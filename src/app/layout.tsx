import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'AlgoViz: Interactive Algorithm Visualization Tool',
  description: 'Learn and visualize sorting, searching, and data structure algorithms like Bubble Sort, Quick Sort, Binary Search, and Hashing step-by-step. An interactive educational tool for students and developers.',
  keywords: 'algorithm visualization, sorting algorithms, searching algorithms, data structures, computer science, education, quick sort, merge sort, binary search, hashing, tree traversal',
  authors: [{ name: 'Mukesh Singh Negi', url: 'https://github.com/negirox' }],
  metadataBase: new URL('https://algo-viz-nu.vercel.app'),
  openGraph: {
    title: 'AlgoViz: Interactive Algorithm Visualization Tool',
    description: 'See algorithms in action. A step-by-step visual guide to understanding complex computer science concepts.',
    url: 'https://algo-viz-nu.vercel.app',
    siteName: 'AlgoViz',
    images: [
      {
        url: 'https://algo-viz-nu.vercel.app/og-image.png', // Update with a real OG image path
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoViz: Interactive Algorithm Visualization Tool',
    description: 'Visualize algorithms like Quick Sort, Binary Search, and more. The best way to learn and prepare for coding interviews.',
    creator: '@YourTwitterHandle', // Optional: Add your Twitter handle
    images: ['https://algo-viz-nu.vercel.app/twitter-image.png'], // Update with a real Twitter image path
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
        <script async custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
        </script>
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        <amp-auto-ads type="adsense"
          data-ad-client="ca-pub-9187440931404634">
        </amp-auto-ads>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
