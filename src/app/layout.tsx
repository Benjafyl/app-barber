import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App Barber Pichilemu",
  description: "Agenda inteligente para barberos y barberías.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
