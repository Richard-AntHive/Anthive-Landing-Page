import { Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AntHive - AI Powered Learning",
  description: "AntHive provides AI-powered summaries, notes, and quizzes for educational content like YouTube videos, PDFs, and audio files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head> element removed as Next.js automatically handles icon.png in app/ */}
      <body className={nunito.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
