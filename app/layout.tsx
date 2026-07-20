import type { Metadata, Viewport } from "next";
import { EB_Garamond, Montserrat, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-ui",
  display: "swap",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-urdu",
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "20 July",
  description: "A few quiet words.",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B132B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${montserrat.variable} ${notoNastaliq.variable} h-[100dvh] overflow-hidden antialiased`}
    >
      <body className="h-[100dvh] overflow-hidden">{children}</body>
    </html>
  );
}
