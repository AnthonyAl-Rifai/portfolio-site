import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientRoot from "./ClientRoot";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anthonyalrifai.com"),
  title: "Anthony Al-Rifai | Full Stack Developer - Frontend Focused",
  description:
    "Frontend-focused Full Stack Developer skilled in React, Vue, and TypeScript, with a creative background in music composition for television.",
  openGraph: {
    type: "website",
    url: "/",
    title: "Anthony Al-Rifai | Full Stack Developer - Frontend Focused",
    description:
      "Frontend-focused Full Stack Developer skilled in React, Vue, and TypeScript, with a creative background in music composition for television.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Anthony Al-Rifai - Full Stack Developer",
      },
    ],
    siteName: "Anthony Al-Rifai Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Al-Rifai | Full Stack Developer - Frontend Focused",
    description:
      "Frontend-focused Full Stack Developer skilled in React, Vue, and TypeScript, with a creative background in music composition for television.",
    images: ["/opengraph-image.png"],
  },
  icons: { icon: "/favicon.ico?v=1", shortcut: "/favicon.ico?v=1" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
