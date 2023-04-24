import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import { COLORS, FONTS } from "../constants";
import { FcBusinessman, FcHome, FcSelfie, FcBookmark } from "react-icons/fc";
import { CurrentUserContext } from "./CurrentUserContext";

const SideBar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Loading>Loading ...</Loading>;
  }

  return (
    <LinkContainer>
      <Logo />
      <Links to="/">
        <FcHome /> Home
      </Links>
      <Links to={`/${currentUser.handle}`}>
        <FcBusinessman /> Profile
      </Links>
      <Links to="/notifications">
        <FcSelfie /> Notification
      </Links>
      <Links to="/bookmarks">
        <FcBookmark /> Bookmarks
      </Links>
    </LinkContainer>
  );
};

const Loading = styled.p`
  display: flex;
  justify-content: center;
  font-family: ${FONTS.default};
  font-size: 20px;
  color: gray;
  margin-top: 20px;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 50px;
  font-family: ${FONTS.default};
  font-size: 20px;
  font-weight: bold;
  height: 200px;
  margin-top: 20px;
  padding-left: 5px;
  padding-right: 5px;
  width: 259px;
`;
const Links = styled(NavLink)`
  color: black;
  text-decoration: none;
  padding: 5px;
  border-radius: 98px;

  &:hover {
    background-color: ${COLORS.primary};
    color: white;
  }

  &.active {
    color: white;
    background-color: ${COLORS.primary};
  }
`;
export default SideBar;
