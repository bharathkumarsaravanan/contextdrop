import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ['latin']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://contextdrop.vercel.app"),

  title: {
    default: "ContextDrop",
    template: "%s | ContextDrop",
  },

  description:
    "Save project knowledge once. Generate AI-ready context for ChatGPT, Claude, Gemini and Cursor.",

  keywords: [
    "AI",
    "ChatGPT",
    "Claude",
    "Gemini",
    "Cursor",
    "Prompt Engineering",
    "Context Management",
    "Developer Tools",
    "Productivity",
  ],

  authors: [
    {
      name: "Bharath Kumar",
    },
  ],

  creator: "Bharath Kumar",

  openGraph: {
    title: "ContextDrop",
    description:
      "Save project knowledge once. Generate AI-ready context for ChatGPT, Claude, Gemini and Cursor.",

    url: process.env.NEXT_PUBLIC_BASE_URL || "https://contextdrop.vercel.app",

    siteName: "ContextDrop",

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "ContextDrop",

    description:
      "Save project knowledge once. Generate AI-ready context for ChatGPT, Claude, Gemini and Cursor.",
  },

  icons: {
    icon: "/icon.svg",
  },
};
