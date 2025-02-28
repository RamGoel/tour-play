import prisma from "@/prisma/client";
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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const pathname = params?.pathname?.toString() || "";

  if (pathname.startsWith("/invite")) {
    const inviterId = searchParams.inviter;
    if (inviterId && typeof inviterId === "string") {
      try {
        // Replace this with your actual user fetching logic
        const inviter = await prisma.user.findFirst({
          where: { username: inviterId },
        });
        return {
          title: `${inviter?.username} challenged you on ${APP_NAME}`,
          description: "Join the geography guessing challenge!",
        };
      } catch (error) {
        console.error("Error fetching inviter:", error);
      }
    }
  }

  // Default metadata
  return {
    title: "Globetrotter",
    description: "Guess & Learn about new places",
  };
}

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
