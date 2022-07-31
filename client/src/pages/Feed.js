import React from "react";

import HomeTweet from "../components/HomeTweet";
import SingleTweet from "../components/SingleTweet";
import Nav from "../components/Nav";
import Auth from "../utils/auth";

function Feed() {
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      {loggedIn ? (
        <div className="row bg-light w-100 min-vh-100">
          <div className="col-4 d-flex justify-content-end text-dark">
            <Nav></Nav>
          </div>
          <div className="col-4 border center-feed">
            <header className="text-dark fs-5 fw-bold bg-light home-header">
              <p className="p-3 header-text">Home</p>
            </header>
            <HomeTweet/>
            <SingleTweet/>
            <SingleTweet/>
            <SingleTweet/>
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