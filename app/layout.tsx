import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google';
import "./globals.css";

const font = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Regular, Semi-bold, Bold
  display: "swap", // Ensures smooth font loading
});

export const metadata: Metadata = {
  title: "Globetrotter",
  description: "Guess & Learn about new places",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className}`}
      >
        {children}
      </body>
    </html>
  );
}
