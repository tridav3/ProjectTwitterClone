import { FiHeart, FiMessageCircle, FiRefreshCw, FiShare } from "react-icons/fi";
import React, { useState } from "react";
import styled from "styled-components";
import { COLORS, FONTS } from "../constants";

const TweetBottom = ({ tweet }) => {
  const { isRetweeted, numLikes, numRetweets } = tweet;
  const [likes, setLikes] = useState(numLikes);
  const [retweets, setRetweets] = useState(numRetweets);
  const [isRetweetedState, setIsRetweeted] = useState(isRetweeted);

  const handleLike = () => {
    setLikes((prev) => (prev === 0 ? 1 : 0));
  };

  const handleRetweet = () => {
    setRetweets((prev) => (isRetweetedState ? prev - 1 : prev + 1));
    setIsRetweeted((prev) => !prev);
  };

  const handleShare = () => {
    console.log("Share");
  };

  return (
    <Wrapper>
      <Button onClick={handleLike}>
        {likes > 0 ? <FiHeart style={{ color: "red" }} /> : <FiHeart />}
        <Number>{likes}</Number>
      </Button>

      <Button onClick={handleRetweet}>
        {isRetweetedState ? (
          <FiRefreshCw style={{ color: "green" }} />
        ) : (
          <FiRefreshCw />
        )}
        <Number>{retweets}</Number>
      </Button>

      <Button onClick={handleShare}>
        <FiShare />
      </Button>

      <Button>
        <FiMessageCircle />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const Button = styled.button`
  font-size: 18px;
  width: 18px;
  height: 18px;
  color: black;
  padding: 0px;
  border: none;
`;

const Number = styled.span`
  font-family: ${FONTS.default};
  color: ${COLORS.gray};
  font-size: 18px;
  margin-left: 5px;
`;

export default TweetBottom;
