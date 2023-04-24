import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TweetBox from "./TweetBox";
import SmallTweet from "./SmallTweet";
import { FONTS } from "../constants";
import ErrorPage from "./ErrorPage";
import { CurrentUserContext } from "./CurrentUserContext";

const HomeFeed = () => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("");
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/me/home-feed")
      .then((response) => response.json())
      .then((data) => {
        setTweets(data);
        if (data.tweetIds && data.tweetsById[data.tweetIds[0]]) {
          setAvatarSrc(data.tweetsById[data.tweetIds[0]].author.avatarSrc);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [reload]);

  return (
    <Wrapper>
      <Home>
        {currentUser
          ? `Welcome back to Critter, @${currentUser.handle}.`
          : "Loading..."}
      </Home>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : avatarSrc ? (
        <TweetBox setReload={setReload} avatarSrc={avatarSrc} />
      ) : null}
      <TweetsContainer>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : tweets.tweetIds ? (
          tweets.tweetIds.map((id) => (
            <SmallTweet key={id} tweet={tweets.tweetsById[id]} />
          ))
        ) : (
          <ErrorPage />
        )}
      </TweetsContainer>
    </Wrapper>
  );
};

export default HomeFeed;

const Home = styled.header`
  font-family: ${FONTS.default};
  color: black;
  font-size: 30px;
  margin-right: auto;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 598px;
`;

const TweetsContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  border-top: 1px solid lightgray;

  /* hide the scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Loading = styled.p`
  display: flex;
  justify-content: center;
  font-family: ${FONTS.default};
  font-size: 20px;
  color: gray;
  margin-top: 20px;
`;
