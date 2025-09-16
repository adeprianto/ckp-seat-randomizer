import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CKP PTPN 1 2025 - Seat Randomizer",
  description: "Seat Randomizer created by CKP PTPN 1 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
