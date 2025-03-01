import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Globetrotter",
  description: "Guess & Learn about new places",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  openGraph: {
    title: "Globetrotter",
    description: "Guess & Learn about new places",
    type: "website",
    locale: "en_US",
    url: "https://globetrotter.com",
    siteName: "Globetrotter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Globetrotter",
    description: "Guess & Learn about new places",
    creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
