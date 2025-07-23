import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/componests/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "movie searching",
    template: "%s | movie searching",
    absolute: "",
  },
  description: `To study about using api of tmdb for fetch api 
  and search title movie and than using guestion-session for vote star`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container mx-auto bg-white md:bg-white min-h-screen max-w-252.5">
          <div className=" mx-2 md:mx-3 md:p-2">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
