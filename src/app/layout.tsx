import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/organisms/Footer/Footer";
import Header from "@/components/organisms/Header/Header";
import "@/styles/globals.css";
import { cva } from "@@/styled-system/css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LGTMeme",
  description:
    "LGTMemeはシンプルでユーモアのあるLGTM（Looks Good To Me）画像作成サービスです。ネットミームで人気のある画像をベースにユニークなLGTM画像を作成・提供します。コミカルな要素を取り入れ、単調なコードレビューや承認プロセスを楽しいものにします。",
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
