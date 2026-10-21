import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const inter = localFont({
  src: './font/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Пространство — недвижимость для бизнеса",
  description:
    "Коммерческая недвижимость для бизнеса. Подбор, проверка и сопровождение сделок.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn("antialiased", inter.variable, "font-sans")}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}