import { APP_NAME } from "@/utils/constants";
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
  title: APP_NAME,
  description: "Guess & Learn about new places",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  openGraph: {
    title: APP_NAME,
    description: "Guess & Learn about new places",
    type: "website",
    locale: "en_US",
    url: "https://tour-play.vercel.app",
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
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
