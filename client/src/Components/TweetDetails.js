import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { Link, useParams } from "react-router-dom";
import DateTime from "./DateTime";
import TweetBottom from "./TweetBottom";
import { FONTS } from "../constants";
import ErrorPage from "./ErrorPage";

const TweetDetails = () => {
  const [tweet, setTweet] = useState(null);
  const { tweetId } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweet(data.tweet);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [tweetId]);

  return (
    <Container>
      {tweet ? (
        <>
          <Avatar src={tweet.author.avatarSrc} />
          <TweetContain>
            <Link to={`/${tweet.author.handle}`}>
              <AuthorName>{tweet.author.displayName}</AuthorName>
            </Link>
            <Status>{tweet.status}</Status>
            <DateTime tweet={tweet} />
            {tweet?.media && tweet.media[0]?.type === "img" && (
              <Image src={tweet.media[0].url} alt="tweet image" />
            )}
            <TweetBottom tweet={tweet} />
          </TweetContain>
        </>
      ) : error ? (
        <ErrorPage />
      ) : (
        <Loading>Loading...</Loading>
      )}
    </Container>
  );
};

export default TweetDetails;

const Loading = styled.p`
  display: flex;
  justify-content: center;
  font-family: ${FONTS.default};
  font-size: 20px;
  color: gray;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: black;
  font-family: ${FONTS.default};
  a {
    text-decoration: none;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: ${COLORS.primary};
  text-decoration: none;
  margin-right: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const Status = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
  color: ${COLORS.darkGray};
`;

const TweetContain = styled.div``;
