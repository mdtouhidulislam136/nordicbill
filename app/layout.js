import "./globals.css";
import CookieBanner from "../components/CookieBanner";

export const metadata = {
  title: "NordicBill | Free Professional Invoice Generator",
  description:
    "Create, preview and download professional invoices instantly. Free, private and no sign-up required.",
  keywords: "invoice generator, free invoice, professional invoice, VAT invoice, GST invoice",
  authors: [{ name: "Nordicdesh" }],
  metadataBase: new URL("https://nordicbill.vercel.app"), // Replace with your actual domain when deployed
  openGraph: {
    title: "NordicBill — Free Professional Invoice Generator",
    description: "Create professional invoices in seconds. No sign-up. 100% free.",
    url: "https://nordicbill.vercel.app",
    siteName: "NordicBill",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NordicBill — Free Professional Invoice Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NordicBill | Free Professional Invoice Generator",
    description: "Create professional invoices in seconds. No sign-up. 100% free.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
