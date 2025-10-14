import "./globals.css";

export const metadata = {
  title: "Your Name - Portfolio",
  description: "My personal portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* All the AIM LINE divs have been REMOVED from this file */}

        <main className="h-screen overflow-y-scroll">{children}</main>
      </body>
    </html>
  );
}
