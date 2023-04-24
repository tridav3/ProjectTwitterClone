import React from "react";
import styled from "styled-components";
import TweetBottom from "./TweetBottom";
import { useNavigate } from "react-router-dom";
import { FONTS } from "../constants";
import { Link } from "react-router-dom";

const SmallTweet = ({ tweet }) => {
  const {
    author: { avatarSrc, displayName, joined, handle },
    status,
  } = tweet;
  const navigate = useNavigate();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/${tweet.author.handle}`);
  };

  return (
    <Container>
      <Wrapper>
        <Link to={`/tweet/${tweet.id}`}>
          <Wrap>
            <Name>
              <Avatar src={avatarSrc} alt="avatar" />
              <DisplayName>{displayName}</DisplayName>

              <Handle onClick={handleClick}>@{handle}</Handle>

              <Joined>Joined: {joined}</Joined>
            </Name>
            <Status>{status}</Status>
            {tweet?.media && tweet.media[0]?.type === "img" && (
              <Image src={tweet.media[0].url} alt="tweet image" />
            )}
          </Wrap>
        </Link>
        <TweetBottom tweet={tweet} />
      </Wrapper>
    </Container>
  );
};
const Image = styled.img`
  width: 50%;
  margin: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: black;
  font-family: ${FONTS.default};
  a {
    text-decoration: none;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: flex start;
  padding: 10px;
  width: 100%;
  margin: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
`;
// button
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
// link
const Name = styled.div`
  display: flex;
  align-items: center;
`;

const DisplayName = styled.div`
  font-weight: bold;
  margin-right: 5px;
  color: black;
`;

const Handle = styled.div`
  color: black;
  margin-right: 5px;
`;

const Joined = styled.div`
  color: gray;
  margin-right: 5px;
`;

const Status = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
`;

export default SmallTweet;
