import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar"; // Ensure Navbar is correctly imported
import ModalProvider from "@/providers/modal-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/providers/toast-provider";
import { Analytics } from "@vercel/analytics/react"; // Import Analytics
import NextTopLoader from 'nextjs-toploader';

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
        <NextTopLoader
              color="#3b82f6" // Default blue - change to match your theme
              height={3}
              showSpinner={false}
              shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
            />
          <ModalProvider />
          <ToastProvider />
          
          {/* Fixed sticky navbar */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <Navbar />
          </div>
          
          {/* Main content with top padding to account for fixed navbar */}
          <main className="flex-1 pt-16">
            {children}
          </main>
          
          <Footer />
          <Analytics /> {/* Add Analytics component here */}
        </body>
      </html>
    </ClerkProvider>
  );
}