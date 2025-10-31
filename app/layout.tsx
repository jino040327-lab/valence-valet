export const metadata = {
  title: "VALENCE Valet",
  description: "프리미엄 발렛·이벤트 주차 운영 & 인력 파견",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
