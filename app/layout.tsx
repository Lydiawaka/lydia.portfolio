import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviderClient } from "../lib/themes/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Lydia Wakarindi Nduati | Software Developer",
  description: "Interactive developer resume and portfolio for Lydia Wakarindi Nduati — Software Developer and IT Support professional based in Nairobi, Kenya.",
  openGraph: {
    title: "Lydia Wakarindi Nduati | Software Developer",
    description: "Interactive developer resume and portfolio for Lydia Wakarindi Nduati — Software Developer and IT Support professional based in Nairobi, Kenya.",
    url: "https://your-domain.com",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"> 
        <ThemeProviderClient>{children}</ThemeProviderClient>
      </body>
    </html>
  );
}
