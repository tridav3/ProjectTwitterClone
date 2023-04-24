import React from "react";
import styled from "styled-components";
import { COLORS, FONTS } from "../constants";

const Bookmarks = () => {
  return (
    <div>
      <H1>Bookmarks</H1>
      <p>Bookmarks Placeholder</p>
    </div>
  );
};

export default Bookmarks;

const H1 = styled.div`
  font-family: ${FONTS.default};
  color: ${COLORS.primary};
`;
