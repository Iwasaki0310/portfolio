import type { Metadata } from "next";
import {
  Space_Grotesk,
  Playfair_Display,
  Zen_Kaku_Gothic_New,
  Shippori_Mincho,
} from "next/font/google";
import "./globals.css";

// ラベル・タグ・カード見出し用（ジオメトリックグロテスク）
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
});

// セクションタイトル用（エディトリアルセリフ）
// Instrument Serif から変更。あちらは weight 400 しか無く、
// 太字指定をしてもブラウザの偽ボールド合成になるため。
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-title",
});

// 和文・本文用（洗練されたモダン角ゴシック）
const noto = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
});

// エディトリアル用の明朝（Studiesセクションのみで使用）
const mincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-serif",
});

const TITLE = "Ren Iwasaki — Web Director / AI Creative Creator";
const DESCRIPTION = "企画とAIで、アイデアを形にする。岩崎怜のポートフォリオサイト。";

/*
 * OGP画像は絶対URLで配信する必要があるため metadataBase が要る。
 * 独自ドメインを取ったら NEXT_PUBLIC_SITE_URL に入れる。未設定なら
 * Vercel が自動で渡す本番ドメイン、それも無ければローカルにフォールバック。
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3001");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Ren Iwasaki",
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/ogp.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/ogp.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" data-sky="day">
      <body
        className={`${spaceGrotesk.variable} ${playfair.variable} ${noto.variable} ${mincho.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
