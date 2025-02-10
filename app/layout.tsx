import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar"; // Ensure Navbar is correctly imported
import ModalProvider from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/providers/toast-provider";

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
        <body className={font.className} style={{ margin: 0, padding: 0, height: '100%' }}>
          <ModalProvider />
          <ToastProvider />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
