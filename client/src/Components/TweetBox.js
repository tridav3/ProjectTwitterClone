import React, { useState } from "react";
import styled from "styled-components";
import { COLORS, FONTS } from "../constants";

const TweetBox = ({ setReload, avatarSrc }) => {
  const [newTweet, setNewTweet] = useState("");
  const [charCount, setCharCount] = useState(280);

  const handleTweet = (event) => {
    const input = event.target.value;
    setNewTweet(input);
    setCharCount(280 - input.length);
  };

  const handleSubmit = () => {
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newTweet }),
    })
      .then((res) => {
        console.log("New tweet created:", res);
        setNewTweet("");
        setCharCount(280);
        setReload((prevReload) => !prevReload);
      })
      .catch((error) => {
        console.error("Error creating tweet:", error);
      });
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Avatar src={avatarSrc} />
        <Input
          type="text"
          value={newTweet}
          onChange={handleTweet}
          placeholder={`Post a tweet here!`}
        />
        <CharCount charCount={charCount}>{charCount} Characters Left</CharCount>
        <Button
          onClick={handleSubmit}
          disabled={charCount < 0 || charCount >= 280}
        >
          {charCount <= 0 ? "Too Many Meows" : "New Meow"}
        </Button>
      </InputWrapper>
    </Wrapper>
  );
};

export default TweetBox;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: ${FONTS.default};
  margin: 0 10px;
`;

const CharCount = styled.div`
  font-size: 15px;
  margin-top: 5px;
  text-align: right;
  color: ${(props) =>
    props.charCount <= 0
      ? COLORS.red
      : props.charCount >= 55
      ? COLORS.primary
      : COLORS.yellow};
`;

const Input = styled.textarea`
  font-size: 20px;
  width: 100%;
  font-family: ${FONTS.default};
  border: none;
  min-height: 100px;
  resize: none;
  outline: none;
  margin-right: 10px;
  overflow-y: auto;
`;

const Button = styled.button`
  align-self: right;
  margin-left: auto;
  padding: 10px 10px;
  border-radius: 50px;
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
  font-family: ${FONTS.default};
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.primaryHover};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    color: ${COLORS.red};
    background-color: ${COLORS.disabled};
    cursor: not-allowed;
  }
`;
