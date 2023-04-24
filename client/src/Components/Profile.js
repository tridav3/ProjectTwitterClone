import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import SmallTweet from "./SmallTweet";
import { FONTS } from "../constants";

const Profile = () => {
  const { handle } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      setError(true);
      return;
    }

    fetch(`/api/${handle}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.profile);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });

    fetch(`/api/${handle}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setTweets(data.tweetIds.map((id) => data.tweetsById[id]));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [handle]);

  return (
    <Wrapper>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : error || !user || !tweets ? (
        <ErrorPage />
      ) : (
        <>
          <PicContainer>
            <Banner src={user.bannerSrc} alt="Banner" />
            <Avatar src={user.avatarSrc} alt="Avatar" />
          </PicContainer>
          <Names>
            <User>{user.displayName}</User>
            <Handle>@{user.handle}</Handle>
          </Names>
          <Bio>{user.bio}</Bio>
          <Info>
            <Loc>{user.location}</Loc>
            <Joined>Joined {user.joined}</Joined>
            <Following>{user.numFollowing} Following</Following>
            <Followers>{user.numFollowers} Followers</Followers>
          </Info>
          <TweetsContainer>
            {tweets
              .filter((tweet) => tweet.author.handle === handle)
              .map((tweet) => (
                <SmallTweet key={tweet.id} tweet={tweet} />
              ))}
          </TweetsContainer>
        </>
      )}
    </Wrapper>
  );
};

const TweetsContainer = styled.div`
  width: 100%;
`;

const Loading = styled.p`
  display: flex;
  justify-content: center;
  font-family: ${FONTS.default};
  font-size: 40px;
  color: gray;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  width: 598px;
  padding: 20px;
`;

const Names = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const PicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Banner = styled.img`
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Avatar = styled.img`
  width: 133px;
  height: 133px;
  border-radius: 50%;
  margin-top: -65px;
  border: 5px solid white;
`;

const User = styled.h1`
  font-size: 20px;
  color: black;
  text-align: left;
  margin-bottom: 5px;
`;

const Handle = styled.h2`
  color: grey;
  text-align: left;
  font-size: 15px;
  margin-bottom: 20px;
`;

const Bio = styled.p`
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

const Loc = styled.p`
  margin-right: 20px;
`;

const Joined = styled.p`
  margin-right: 20px;
`;

const Following = styled.p`
  margin-right: 20px;
`;

const Followers = styled.p``;

export default Profile;
