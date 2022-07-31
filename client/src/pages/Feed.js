import{ React, useState } from "react";

import Settings from "../components/Settings";
import HomeTweet from "../components/HomeTweet";
import SingleTweet from "../components/SingleTweet";
import Nav from "../components/Nav";
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