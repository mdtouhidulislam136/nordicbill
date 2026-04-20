import "./globals.css";
import CookieBanner from "../components/CookieBanner";

export const metadata = {
  title: "NordicBill | Free Professional Invoice Generator",
  description:
    "Create, preview and download professional invoices instantly. Free, private and no sign-up required.",
  keywords: "invoice generator, free invoice, professional invoice, VAT invoice, GST invoice",
  authors: [{ name: "Nordicdesh" }],
  openGraph: {
    title: "NordicBill — Free Professional Invoice Generator",
    description: "Create professional invoices in seconds. No sign-up. 100% free.",
    type: "website",
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
