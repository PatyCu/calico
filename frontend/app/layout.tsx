import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Conversation | Calico",
  description: "A space to think, explore, and create with Calico.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { const theme = localStorage.getItem("calico-theme"); if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme; } catch {}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
