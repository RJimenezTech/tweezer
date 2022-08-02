import { React, useState, useEffect } from "react";

import Nav from "../components/Nav";
import HomeTweet from "../components/HomeTweet";
import Explore from "../components/Explore";
import Notifications from "../components/Notifications";
import Messages from "../components/Messages";
import Bookmarks from "../components/Bookmarks";
import Lists from "../components/Lists";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

import Auth from "../utils/auth";

function Feed() {
  const loggedIn = Auth.loggedIn();
  // default tab is Home
  const [currentTab, setCurrentTab] = useState(1);
  const passData = (currentTab) => {
    setCurrentTab(currentTab);
  };
  return (
    <main>
      {loggedIn ? (
        <div className="row bg-light w-100 min-vh-100">
          <div className="col-4 d-flex justify-content-end text-dark">
            <Nav passData={passData}></Nav>
          </div>
          <div className="col-4 border center-feed">
            {currentTab === 1 && <HomeTweet />}
            {currentTab === 2 && <Explore />}
            {currentTab === 3 && <Notifications />}
            {currentTab === 4 && <Messages />}
            {currentTab === 5 && <Bookmarks />}
            {currentTab === 6 && <Lists />}
            {currentTab === 7 && <Profile />}
            {currentTab === 8 && <Settings />}
          </div>
          <div className="col-4"></div>
        </div>
      ) : (
        <div>
          <h1>You must be logged in to view this page!</h1>
        </div>
      )}
    </main>
  );
};

export default Feed;