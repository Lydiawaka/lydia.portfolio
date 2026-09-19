import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviderClient } from "../lib/themes/ThemeProvider";

export const metadata: Metadata = {
  title: "Lydia Wakarindi Nduati | Software Developer",
  description: "Interactive developer resume and portfolio for Lydia Wakarindi Nduati — Software Developer and IT Support professional based in Nairobi, Kenya.",
  openGraph: {
    title: "Lydia Wakarindi Nduati | Software Developer",
    description: "Interactive developer resume and portfolio for Lydia Wakarindi Nduati — Software Developer and IT Support professional based in Nairobi, Kenya.",
    url: "https://www.ndifin.com/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProviderClient>{children}</ThemeProviderClient>
      </body>
    </html>
  );
}
