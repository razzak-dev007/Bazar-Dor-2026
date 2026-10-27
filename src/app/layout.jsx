import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম",
  description: "দৈনন্দিন নিত্যপ্রয়োজনীয় পণ্যের বাজার দর, দামের ওঠানামা এবং বাজারভিত্তিক বিস্তারিত তথ্য এক নজরে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <PriceTicker />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
