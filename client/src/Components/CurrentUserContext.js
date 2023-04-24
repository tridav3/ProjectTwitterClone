import { createContext, useState, useEffect } from "react";
export const CurrentUserContext = createContext(null);
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserStatus, setCurrentUserStatus] = useState("starting");
  const [tweets, setTweets] = useState(false);
  const [singleTweet, setSingleTweet] = useState(false);
  const [userFeed, setUserFeed] = useState(false);
  const [updateFeed, setUpdateFeed] = useState(false);
  const [tweetsStatus, setTweetsStatus] = useState("starting");

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.profile);
        setCurrentUserStatus("idle");
        console.log("Current user fetch");
      })
      .catch(() => {
        setCurrentUserStatus("error");
        console.log("Current user failed");
      });
  }, []);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
        console.log("Tweet Fetch");
        setTweetsStatus("idle");
      })
      .catch(() => {
        setTweetsStatus("error");
        console.log("Tweets failed");
      });
  }, [updateFeed]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        tweets,
        setTweets,
        singleTweet,
        setSingleTweet,
        userFeed,
        setUserFeed,
        updateFeed,
        setUpdateFeed,
        currentUserStatus,
        setCurrentUserStatus,
        tweetsStatus,
        setTweetsStatus,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
