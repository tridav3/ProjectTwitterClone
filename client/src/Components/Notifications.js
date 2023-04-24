import React from "react";
import { FONTS } from "../constants";
import styled from "styled-components";
const Notifications = () => {
  return (
    <div>
      <H1>Notifications</H1>
      <p>Notifications placeholder</p>
    </div>
  );
};

const H1 = styled.div`
  font-family: ${FONTS.default};
`;

export default Notifications;
