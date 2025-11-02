import "./globals.css";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://parkly-valet.vercel.app"),
  title: "Parkly — Premium Valet & Parking Solutions",
  description: "레스토랑·메디컬센터·브랜드 이벤트를 위한 프리미엄 주차·운영 솔루션",
  openGraph: {
    title: "Parkly — Premium Valet & Parking Solutions",
    description: "레스토랑·메디컬센터·브랜드 이벤트를 위한 프리미엄 주차·운영 솔루션",
    url: "/",
    siteName: "Parkly",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parkly — Premium Valet & Parking Solutions",
    description: "프리미엄 주차·운영 솔루션",
    images: ["/og.svg"],
  },
  icons: { icon: "/favicon.svg" },
  alternates: { canonical: "/" },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const noto  = Noto_Sans_KR({ subsets: ["latin"], weight: ["400","500","700"], variable: "--font-noto", display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${inter.variable} ${noto.variable}`}>
      <body className="font-sans antialiased text-zinc-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
