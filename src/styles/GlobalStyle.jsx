import { css, Global } from "@emotion/react";
import React from "react";
const styles = css`
  body {
    padding: 0;
    margin: 0;
  }
`;
export default function GlobalStyle() {
  return <Global styles={styles} />;
}
