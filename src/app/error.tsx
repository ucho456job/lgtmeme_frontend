"use client";

import Link from "next/link";
import Button from "@/components/atoms/Button/Button";
import { HOME_ENDPOINT } from "@/constants/endpoints";
import { css } from "@@/styled-system/css";

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return (
    <div className={containerCss}>
      <h1 className={h1Css}>Oops! An error occurred.</h1>
      <p>{error.message}</p>
      <Link href={HOME_ENDPOINT}>
        <Button css={buttonCss}>Back to home</Button>
      </Link>
    </div>
  );
};

const containerCss = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});
const h1Css = css({ fontSize: "2xl", fontWeight: "bold", margin: "5" });
const buttonCss = css({ marginTop: "3" });

export default Error;
