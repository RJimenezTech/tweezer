import React from "react";

import defaultPFP from "../../assets/images/default-pfp.jpg";


function SingleTweet() {
    return (
      <div className="mx-2 mt-3 row border-bottom">
        <div className="col-12">
          <div className="row">
            <div className="col-2">
              <img
                src={defaultPFP}
                className="rounded-circle img-fluid"
                alt="default avatar"></img>
            </div>
            <div className="col-10">
              <h6 className="fw-bold my-0">First Last</h6>
              <a className="text-decoration-none text-secondary option" href="github.com">
                @username
              </a>
            </div>
          </div>
          <div className="">
            <div className="border-bottom py-2">
              <p className="fs-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
                odit ea ut inventore ducimus error.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
                odit ea ut inventore ducimus error.
              </p>
            </div>
            <div className="d-flex text-secondary py-2 border-bottom">
              <p className="mx-2 my-0">10:00 AM</p>
              <p className="mx-2 my-0">July 30, 2022</p>
            </div>
            <div className="d-flex text-secondary py-2 border-bottom">
              <p className="mx-2 my-0">Replies</p>
              <p className="mx-2 my-0">Retweets</p>
              <p className="mx-2 my-0">Quotes</p>
              <p className="mx-2 my-0">Likes</p>
            </div>
            <div className="d-flex text-secondary justify-content-around py-2 fs-4 border-bottom">
              <i className="bi bi-reply mx-1 option"></i>
              <i className="bi bi-arrow-repeat mx-1 option"></i>
              <i className="bi bi-heart mx-1 option"></i>
              <i className="bi bi-share mx-1 option"></i>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <textarea
                id="tweet-input"
                placeholder="Reply to this tweet..."
                className="bg-light border border-0 w-100"
                maxLength="240"></textarea>
              <button className="my-4 w-25 rounded-pill btn text-light fw-bold primary btn-md">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SingleTweet;