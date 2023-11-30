import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Favicon from "/public/favicon.ico";
import Footer from "@/components/organisms/Footer/Footer";
import Header from "@/components/organisms/Header/Header";
import "@/styles/globals.css";
import { cva } from "@@/styled-system/css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LGTMeme",
  description:
    "LGTMemeはシンプルなLGTM（Looks Good To Me）画像作成サービスです。お気に入りの画像に素早くLGTMの文字を挿入してMarkdownをクリップボードにコピーできます。単調なコードレビューや承認プロセスを、ユーモアのあるLGTM画像で華やかにしましょう。",
  manifest: "/manifest.webmanifest",
  icons: [{ rel: "icon", url: Favicon.src }],
  themeColor: "#292524",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className={mainRecipe()}>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

const mainRecipe = cva({
  base: { bg: "GHOUST_WHITE", maxWidth: "100vw", md: { minHeight: "calc(100vh - 200px)" } },
});

export default RootLayout;
