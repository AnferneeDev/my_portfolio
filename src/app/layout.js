import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Your Name - Portfolio",
  description: "My personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {/* All the AIM LINE divs have been REMOVED from this file */}

        <main className="h-screen overflow-y-scroll snap-y snap-mandatory">{children}</main>
      </body>
    </html>
  );
}
