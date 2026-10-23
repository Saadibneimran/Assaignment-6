import { Oswald, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Browse gym workouts, build today's plan, and track weekly calories with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>
        <PlanProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <Toaster position="top-right" toastOptions={{ style: { background: "#16181f", color: "#fff", border: "1px solid #2a2d38" } }} />
        </PlanProvider>
      </body>
    </html>
  );
}
