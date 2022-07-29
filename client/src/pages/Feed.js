import React from "react";

// import HomeTweet from "../components/HomeTweet"

import tweezer from "../assets/images/tweezer.svg"

function Feed() {
    return (
      <div className="row min-vh-100">
        <div className="col-4 d-flex justify-content-end text-dark">
          <div className="fs-3">
            <img src={tweezer} alt="tweezer logo" className="logo my-3"/>
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
          <header className="text-dark fs-5 fw-bold bg-danger home-header">
            <p>Home</p>
          </header>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat tenetur nesciunt ipsum placeat iusto eligendi maxime aut sint porro quo doloremque amet, ratione dignissimos nam fuga unde libero corporis rerum.</div>
        </div>
        <div className="col-4"></div>
      </div>
    );
};

export default Feed;