import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Anfernee - Portfolio",
  description: "My personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="h-screen overflow-y-scroll">{children}</main>

        <Analytics />
      </body>
    </html>
  );
}
