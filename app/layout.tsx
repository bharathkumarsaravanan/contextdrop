import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import PostHogProvider from '@/components/analytics/posthog-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning>
      <body className={inter.className}>
        <PostHogProvider>{children}</PostHogProvider>
        <Toaster richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://contextdrop-green.vercel.app';
const title = "ContextDrop";
const description = "Stop rewriting project context for AI. Save reusable project knowledge, generate structured context, and work seamlessly across ChatGPT, Claude, Gemini, and Cursor.";
const socialImage = "/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(
    baseUrl
  ),

  applicationName: 'ContextDrop',
  title: { default: title, template: `%s | ${title}` },
  category: 'Developer Tools',

  description,

  keywords: [
    'ContextDrop',
    'AI Context',
    'Context Management',
    'Prompt Engineering',
    'Developer Productivity',
    'ChatGPT',
    'Claude',
    'Gemini',
    'Cursor',
    'AI Workspace',
    'Project Memory',
    'Reusable Prompts',
    'AI Developer Tools'
  ],

  authors: [
  {
    name: "Bharath Kumar",
    url: "https://github.com/bharathkumarsaravanan",
  },
],

  creator: 'Bharath Kumar',

  openGraph: {
    title,
    description,

    url: baseUrl,

    siteName: title,

    locale: 'en_US',

    type: 'website',

    images: [
      { url: socialImage, width: 1200, height: 630, alt: title }
    ]
  },

  twitter: {
    card: 'summary_large_image',

    title: title,

    description,

    images: [socialImage],
  },

icons: {
  icon: '/icon.svg',
  shortcut: '/icon.svg',
  apple: '/icon.svg',
},
  robots: { index: true, follow: true },
  manifest: '/site.webmanifest'
};
