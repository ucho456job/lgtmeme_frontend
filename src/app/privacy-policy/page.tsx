import Link from "next/link";
import { css } from "@@/styled-system/css";

const PrivacyPolicy = () => {
  return (
    <div className={containerCss}>
      <div className={contentCss}>
        <h1 className={h1Css}>プライバシーポリシー</h1>
        <p>
          このプライバシーポリシー（以下「ポリシー」といいます）は、LGTM画像生成サービス『LGTMeme』（以下「本サービス」といいます）を提供するサービス提供者（以下「運営者」といいます）が、ユーザー（以下「利用者」といいます）の個人情報を収集、使用、保護する方法に関するポリシーを説明します。本サービスを利用する前に、以下のポリシーを注意深くお読みいただき、同意いただく必要があります。
        </p>
        <h2 className={h2Css}>1. 収集する情報</h2>
        <p>1.1. 利用者から提供される情報</p>
        <p>・利用者の名前（オプション）</p>
        <p>・利用者のメールアドレス（オプション）</p>
        <p>1.2. 自動的に収集される情報</p>
        <p>・利用者のIPアドレス</p>
        <p>・ブラウザ情報</p>
        <p>・利用者のデバイス情報</p>
        <h2 className={h2Css}>2. 収集の目的</h2>
        <p>2.1. 運営者は、収集した情報を以下の目的で使用します。</p>
        <p>・本サービスの提供および機能の向上</p>
        <p>・利用者へのサポート提供</p>
        <p>・匿名の統計データの収集と分析</p>
        <p>・本サービスのセキュリティと法的要件の遵守</p>
        <h2 className={h2Css}>3. 情報の共有</h2>
        <p>3.1. 運営者は、利用者の個人情報を第三者と共有することはありません。</p>
        <h2 className={h2Css}>4. クッキーとトラッキング技術</h2>
        <p>
          4.1.
          本サービスはクッキーや類似のトラッキング技術を使用しないため、利用者のプライバシーに関連する情報は収集されません。
        </p>
        <h2 className={h2Css}>5. ユーザーの選択肢</h2>
        <p>
          5.1.
          利用者は、本サービスを匿名で利用できます。提供される情報（名前やメールアドレスなど）は、利用者の自発的な提供によるものです。ユーザーは情報の提供に関して選択権を持ち、提供しないこともできます。
        </p>
        <h2 className={h2Css}>6. データの保存期間</h2>
        <p>
          6.1.
          運営者は、収集した情報を必要な期間保存し、その期間が終了したら情報を削除または匿名化します。
        </p>
        <h2 className={h2Css}>7. 未成年者のプライバシー</h2>
        <p>
          7.1.
          本サービスは、未成年者向けに提供されておらず、未成年者から意図的に情報を収集することはありません。
        </p>
        <h2 className={h2Css}>8. プライバシーポリシーの変更</h2>
        <p>
          8.1.
          運営者は、ポリシーを随時変更する権利を留保します。変更が行われた場合、利用者に通知する義務はありません。利用者は、定期的にポリシーを確認する責任を負います。
        </p>
        <h2 className={h2Css}>9. 連絡先情報</h2>
        <p>
          9.1.
          プライバシーポリシーに関するご質問、要望、およびその他の連絡事項については、以下の連絡先にご連絡ください。
        </p>
        <br />
        <Link className={linkCss} href="https://twitter.com/ucho456job">
          https://twitter.com/ucho456job
        </Link>
      </div>
    </div>
  );
};

const containerCss = css({ display: "flex", justifyContent: "center", padding: "5" });
const contentCss = css({ maxWidth: "1090px", padding: 5 });
const h1Css = css({ fontSize: "3xl", fontWeight: "bold" });
const h2Css = css({ fontSize: "xl", fontWeight: "bold", marginTop: "5" });
const linkCss = css({
  color: "LIGHT_BLUE",
  _hover: { opacity: 0.8, borderBottom: "1px solid", borderColor: "LIGHT_BLUE" },
});

export default PrivacyPolicy;
