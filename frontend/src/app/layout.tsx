import type { Metadata } from "next";
import { Cairo } from "next/font/google";
// @ts-ignore: Allow side-effect CSS import without type declarations
import "./globals.css";

// تفعيل الخط العربي
const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "نظام النخبة | إدارة مكاتب المحاماة",
  description: "البوابة الرقمية لإدارة قضايا مكتب الأستاذ محمود شعبان داخلي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        {children}
      </body>
    </html>
  );
}