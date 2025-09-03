import "./styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aryan Bhansali — Software Engineer",
  description:
    "Portfolio of Aryan Bhansali — Software Engineer focusing on data platforms, search, and scalable systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inter font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise" aria-hidden="true" />
        <div className="bg-anim" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
