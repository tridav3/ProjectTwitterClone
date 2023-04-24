import React from "react";

import moment from "moment";
import styled from "styled-components";

const DateTime = ({ tweet }) => {
  const timeStamp = tweet.timestamp.substr(0, 16);
  const formattedDate = moment(timeStamp).format("MMM D");
  const formattedTime = moment(timeStamp).format("h:mm A");

  return (
    <Container>
      <Time>{formattedTime}</Time>
      <Separator>·</Separator>
      <Date>{formattedDate}</Date>
    </Container>
  );
};

const Container = styled.div`
  color: rgb(130, 130, 130);
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Time = styled.div`
  margin-right: 5px;
`;

const Separator = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;

const Date = styled.div`
  margin-right: 5px;
`;

export default DateTime;
