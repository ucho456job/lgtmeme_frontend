import Link from "next/link";
import { PRIVACY_POLICY_ENDPOINT, TWITTER_LINK_ENDPOINT } from "@/constants/endpoints";
import { css } from "@@/styled-system/css";

const TermsOfService = () => {
  return (
    <div className={containerCss}>
      <div className={contentCss}>
        <h1 className={h1Css}>利用規約</h1>
        <br />
        <p>
          この利用規約（以下「規約」といいます）は、サービス提供者（以下「運営者」といいます）とサービス利用者（以下「利用者」といいます）との間で、運営者が提供するLGTM画像生成サービス『LGTMeme』（以下「本サービス」といいます）の利用に関する条件を定めるものです。本サービスを利用する前に、以下の規約をよくお読みいただき、同意いただく必要があります。
        </p>
        <h2 className={h2Css}>1. サービスの提供</h2>
        <p>
          1.1.
          運営者は、本サービスを提供しますが、提供内容や利用可能な機能については随時変更する権利を留保します。運営者は、通知を行うことなく、サービスの変更または中止を決定することがあります。
        </p>
        <p>
          1.2.
          利用者は、本サービスを提供するために必要な一切の権利を有するものとします。利用者は、本サービスを利用する際に、他人の著作権、商標権、特許権などの知的財産権を侵害しないことを確保しなければなりません。
        </p>
        <h2 className={h2Css}>2. 免責事項</h2>
        <p>
          2.1.
          本サービスは「現状有姿勢」で提供されます。運営者は、本サービスの正確性、完全性、適用性についていかなる保証も提供しません。利用者は、本サービスを利用する際のリスクを自己負担とし、運営者はいかなる損害に対しても責任を負いません。
        </p>
        <h2 className={h2Css}>3. 利用者の責任</h2>
        <p>3.1. 利用者は、本サービスを利用する際に、次の条件に同意し、これに従うものとします。</p>
        <p>・本サービスを悪用し、違法な行為を行わないこと。</p>
        <p>・元画像の著作権やライセンスに留意し、それに違反しないこと。</p>
        <p>・過剰な数のリクエストを送信してサービスに負荷をかけないこと。。</p>
        <p>
          ・運営者が不適切と判断した画像を作成しないこと。不適切な画像は運営者の裁量で削除することがあります。
        </p>
        <h2 className={h2Css}>4. プライバシー</h2>
        <p>
          4.1.
          利用者のプライバシーについては、運営者のプライバシーポリシーに従います。プライバシーポリシーについては
          <Link className={linkCss} href={PRIVACY_POLICY_ENDPOINT}>
            こちら
          </Link>
          を参照してください。
        </p>
        <h2 className={h2Css}>5. 法的紛争解決</h2>
        <p>
          5.1.
          本規約に関する紛争については、日本国法を準拠法とし、東京地方裁判所を第一審の専属的管轄裁判所とします。
        </p>
        <h2 className={h2Css}>6. 利用規約の変更</h2>
        <p>
          6.1.
          運営者は、本規約を随時変更する権利を有します。変更が行われた場合、利用者に通知する義務はありません。利用者は、定期的に本規約を確認する責任を負います。
        </p>
        <h2 className={h2Css}>7. 連絡先情報</h2>
        <p>
          7.1.
          本サービスに関する問い合わせ、通報、およびその他の連絡事項については、以下の連絡先にご連絡ください。
        </p>
        <br />
        <a className={linkCss} href={TWITTER_LINK_ENDPOINT} target="_blank">
          {TWITTER_LINK_ENDPOINT}
        </a>
      </div>
    </div>
  );
};

const containerCss = css({ display: "flex", justifyContent: "center", padding: "5" });
const contentCss = css({ maxWidth: "1090px", padding: 5 });
const h1Css = css({ fontSize: "2xl", fontWeight: "bold" });
const h2Css = css({ fontSize: "xl", fontWeight: "bold", marginTop: "5" });
const linkCss = css({
  color: "LIGHT_BLUE",
  _hover: { opacity: 0.8, borderBottom: "1px solid", borderColor: "LIGHT_BLUE" },
});

export default TermsOfService;
