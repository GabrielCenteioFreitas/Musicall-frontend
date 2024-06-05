import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musicall",
  description: "Todas as músicas em um só lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} dark bg-zinc-950 text-zinc-50 h-screen no-scrollbar`}>
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </body>
    </html>
  );
}
