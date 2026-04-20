import "./globals.css";
import CookieBanner from "../components/CookieBanner";

export const metadata = {
  title: "NordicBill | Professional Invoice Generator",
  description: "Generate professional and beautiful invoices instantly.",
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
