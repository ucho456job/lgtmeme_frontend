/** Common CSS for terms of service and privacy policy */
import { css } from "@@/styled-system/css";

export const containerCss = css({ display: "flex", justifyContent: "center", padding: "5" });
export const contentCss = css({ maxWidth: "1090px", padding: 5 });
export const h1Css = css({ fontSize: "2xl", fontWeight: "bold" });
export const h2Css = css({ fontSize: "xl", fontWeight: "bold", marginTop: "5" });
export const linkCss = css({
  color: "LIGHT_BLUE",
  _hover: { opacity: 0.8, borderBottom: "1px solid", borderColor: "LIGHT_BLUE" },
});
