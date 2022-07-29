import React from "react";

import defaultPFP from "../../assets/images/default-pfp.jpg";

function HomeTweet() {
    return (
      <div className="row mx-2 border-bottom">
        <div className="col-2">
          <img
            src={defaultPFP}
            className="rounded-circle img-fluid"
            alt="default avatar"
          ></img>
        </div>
        <div className="col-10">
          <div className="border-bottom">
            <textarea
              id="tweet-input"
              placeholder="What's going on?"
              className="fs-5 bg-light border border-0 w-100"
              maxLength="240"
            ></textarea>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div className="fs-4">
              <i className="bi bi-image mx-1 option"></i>
              <i className="bi bi-filetype-gif mx-1 option"></i>
              <i className="bi bi-clipboard-data mx-1 option"></i>
              <i className="bi bi-emoji-kiss mx-1 option"></i>
              <i className="bi bi-calendar mx-1 option"></i>
              <i className="bi bi-geo-alt mx-1 option"></i>
            </div>
            <button className="my-4 w-25 rounded-pill btn text-light fw-bold primary btn-md">
              Tweet
            </button>
          </div>
        </div>
      </div>
    );
}

export default HomeTweet;