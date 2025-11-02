import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://parkly-valet.vercel.app"),
  title: {
    default: "Parkly — Premium Valet & Parking",
    template: "%s | Parkly"
  },
  description: "레스토랑·메디컬센터·브랜드 이벤트를 위한 프리미엄 발렛·주차 운영 솔루션",
  openGraph: {
    title: "Parkly — Premium Valet & Parking",
    description: "레스토랑·메디컬센터·브랜드 이벤트를 위한 프리미엄 발렛·주차 운영 솔루션",
    url: "https://parkly-valet.vercel.app",
    siteName: "Parkly",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Parkly" }],
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Parkly — Premium Valet & Parking",
    description: "레스토랑·메디컬센터·브랜드 이벤트를 위한 프리미엄 발렛·주차 운영 솔루션",
    images: ["/og.svg"]
  },
  alternates: { canonical: "https://parkly-valet.vercel.app" },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  themeColor: "#ffffff"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
