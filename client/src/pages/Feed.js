import React from "react";

import HomeTweet from "../components/HomeTweet";
import SingleTweet from "../components/SingleTweet";
// import Auth from "../utils/auth";

import tweezer from "../assets/images/tweezer.svg"

function Feed() {
  const loggedIn = true;
  return (
    <main>
      {loggedIn ? (
        <div className="row bg-light w-100 min-vh-100">
          <div className="col-4 d-flex justify-content-end text-dark">
            <div className="fs-3">
              <img src={tweezer} alt="tweezer logo" className="logo my-3" />
              <div className="option d-flex flex-row my-2">
                <i className="bi bi-house mx-2"></i>
                <p className="my-auto mx-3">Home</p>
              </div>
              <div className="option d-flex flex-row my-2">
                <i className="bi bi-search-heart mx-2"></i>
                <p className="my-auto mx-3">Explore</p>
              </div>
              <div className="option d-flex flex-row my-2">
                <i className="bi bi-bell mx-2"></i>
                <p className="my-auto mx-3">Notifications</p>
              </div>
              <div className="option d-flex flex-row my-2">
                <i className="bi bi-envelope mx-2"></i>
                <p className="my-auto mx-3">Messages</p>
              </div>
              <div className="option d-flex flex-row my-2">
                <i className="bi bi-bookmark mx-2"></i>
                <p className="my-auto mx-3">Bookmarks</p>
              </div>
              <div className="option d-flex flex-row my-2">
                <i className="bi bi-sticky mx-2"></i>
                <p className="my-auto mx-3">Lists</p>
              </div>
              <div className="option d-flex flex-row my-2">
                <i className="bi bi-person mx-2"></i>
                <p className="my-auto mx-3">Profile</p>
              </div>
              <div className="option d-flex flex-row my-2">
                <i className="bi bi-gear mx-2"></i>
                <p className="my-auto w-100 mx-3">More</p>
              </div>
              <button className="my-4 w-100 rounded-pill btn text-light fw-bold primary btn-lg">
                Tweet
              </button>
            </div>
          </div>
          <div className="col-4 border center-feed">
            <header className="text-dark fs-5 fw-bold bg-light home-header">
              <p className="p-3 header-text">Home</p>
            </header>
            <HomeTweet/>
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