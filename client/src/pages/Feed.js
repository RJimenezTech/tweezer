import React from "react";

function Feed() {
    return (
      <div className="row min-vh-100">
        <div className="col-2 border border-dark text-dark">
          <div className="container d-flex flex-column justify-content-center fs-3">
            <div className="d-flex flex-row my-2">
              <i className="bi bi-house mx-2"></i>
              <p className="my-auto mx-3">Home</p>
            </div>
            <div className="d-flex flex-row my-2">
              <i className="bi bi-search-heart mx-2"></i>
              <p className="my-auto mx-3">Explore</p>
            </div>
            <div className="d-flex flex-row my-2">
              <i className="bi bi-bell mx-2"></i>
              <p className="my-auto mx-3">Notifications</p>
            </div>
            <div className="d-flex flex-row my-2">
              <i className="bi bi-envelope mx-2"></i>
              <p className="my-auto mx-3">Messages</p>
            </div>
            <div className="d-flex flex-row my-2">
              <i className="bi bi-bookmark mx-2"></i>
              <p className="my-auto mx-3">Bookmarks</p>
            </div>
            <div className="d-flex flex-row my-2">
              <i className="bi bi-sticky mx-2"></i>
              <p className="my-auto mx-3">Lists</p>
            </div>
            <div className="d-flex flex-row my-2">
              <i className="bi bi-person mx-2"></i>
              <p className="my-auto mx-3">Profile</p>
            </div>
            <div className="d-flex flex-row my-2">
              <i className="bi bi-gear mx-2"></i>
              <p className="my-auto w-100 mx-3">More</p>
            </div>
            <button className="my-4 fw-bold btn text-light fw-bold primary btn-lg">
              Tweet
            </button>
          </div>
        </div>
        <div className="col-8 border border-dark"></div>
        <div className="col-2 border border-dark"></div>
      </div>
    );
};

export default Feed;