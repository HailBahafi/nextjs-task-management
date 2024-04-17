import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../redux-toolkit/providers"; //Redux
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the document
export const metadata: Metadata = {
  title: "Task Management",
};

// Define the RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
