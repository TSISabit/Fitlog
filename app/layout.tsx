import "./globals.css";
import { Oswald, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "FitLog — Workout Library & Daily Fitness Planner",
  description: "A dark, no-nonsense gym companion to log sets and structure daily lifts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body 
        suppressHydrationWarning
        className="bg-[#0b0c0e] text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-[#ccff00] selection:text-black"
      >
        <WorkoutProvider>
          <Toaster 
            position="bottom-right" 
            toastOptions={{ 
              style: { 
                background: "#181a20", 
                color: "#fff", 
                border: "1px solid #27272a" 
              } 
            }} 
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}