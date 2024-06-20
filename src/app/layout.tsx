import { DefaultLayout } from "@/components/DefaultLayout/DefaultLayout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { PlayerProvider } from "@/contexts/PlayerContext";
import { Player } from "@/components/Player/Player";
import { TimeProvider } from "@/contexts/TimeContext";

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
        <PlayerProvider>
          <TimeProvider>
            <DefaultLayout>
              {children}
            </DefaultLayout>

            <Player />
          </TimeProvider>
        </PlayerProvider>

        <ToastContainer
          theme="dark" 
          position= "bottom-right"
        />
      </body>
    </html>
  );
}
