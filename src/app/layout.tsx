
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalkPDF",
  description: "TalkPDF Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen`}>
        <Sidebar />
        <main className="flex-grow p-8 bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
