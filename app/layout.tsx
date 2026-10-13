import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TripProvider } from "@/context/TripContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TripDrawer } from "@/components/TripDrawer";
import { DestinationModal } from "@/components/DestinationModal";
import { FloatingDock } from "@/components/FloatingDock";
import { Toast } from "@/components/Toast";

export const viewport: Viewport = {
  themeColor: "#182e5c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nimbleholidays.com"),
  title: "Nimble Holidays | The World Is for Everyone — Tailored Trips & Quotations",
  description:
    "Discover Kerala backwaters, hill stations, royal India, and international getaways. Pick destinations like shopping online, add them to your trip list, and receive a handcrafted quotation from Nimble Holidays. Rooted in Kerala since 2010, serving India and the GCC.",
  keywords: [
    "Nimble Holidays",
    "Kerala Tour Packages",
    "Kerala Ayurveda",
    "Alleppey Houseboat",
    "Munnar Tour",
    "Custom Travel Planner",
    "GCC Kerala Tours",
    "Saudi Arabia to Kerala Flights",
    "Personalized Holiday Quotation",
  ],
  authors: [{ name: "Nimble Holidays" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Nimble Holidays | The World Is for Everyone",
    description:
      "Craft your dream holiday without fixed package constraints. Select destinations, get custom quotations, and plan seamlessly on WhatsApp.",
    url: "https://nimbleholidays.com",
    siteName: "Nimble Holidays",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Nimble Holidays Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-[#111e33] antialiased selection:bg-[#42bfd8]/20 selection:text-[#182e5c]"
      >
        <TripProvider>
          <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <TripDrawer />
            <DestinationModal />
            <FloatingDock />
            <Toast />
          </div>
        </TripProvider>
      </body>
    </html>
  );
}
