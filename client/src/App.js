import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomeFeed from "./Components/HomeFeed";
import Notifications from "./Components/Notifications";
import Bookmarks from "./Components/Bookmarks";
import Profile from "./Components/Profile";
import TweetDetails from "./Components/TweetDetails";
import Sidebar from "./Components/Sidebar";
import GlobalStyles from "./GlobalStyles";

const App = () => {
  return (
    <Router>
      <Container>
        <GlobalStyles />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/:handle" element={<Profile />} />
          <Route path="/tweet/:tweetId" element={<TweetDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 1300px;
  /* height: 100vh; */
  margin-left: auto;
  margin-right: auto;
`;

export default App;
