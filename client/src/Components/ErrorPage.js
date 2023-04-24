import React from "react";
import { FaBomb } from "react-icons/fa";
import styled from "styled-components";
import { FONTS, COLORS } from "../constants";

const ErrorPage = () => {
  const handleClick = () => {
    window.alert("I don't know how to help. Good Luck.");
    return false;
  };

  return (
    <Container>
      <BombIcon />
      <Title>Unknown Error Has Occurred</Title>
      <Message>
        Please <Link onClick={handleClick}>contact support</Link>, for more
        info.
      </Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 25%;
`;

const BombIcon = styled(FaBomb)`
  font-size: 100px;
  color: ${COLORS.primary};
`;

const Title = styled.h1`
  font-family: ${FONTS.default};
  font-weight: 1000;
  font-size: 30px;
  color: ${COLORS.text};
`;

const Message = styled.p`
  font-family: ${FONTS.default};
  font-weight: normal;
  font-size: 20px;
  color: ${COLORS.text};
`;

const Link = styled.a`
  color: ${COLORS.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default ErrorPage;
