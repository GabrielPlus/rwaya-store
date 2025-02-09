import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ModalProvider from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rwaya Collection",
  description: "Rwaya Collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body className={font.className}>
            <ModalProvider />
            <Navbar />
            <div className="flex">
              <main className="flex-1">
                {children}
              </main>
            </div>
            <Footer />
          </body>
        </html>
    </ClerkProvider>
  );
}
