import React from "react";

import defaultPFP from "../../assets/images/default-pfp.jpg";


function SingleTweet({ tweets }) {
  if (!tweets.length) {
    return <h5>No tweets yet!</h5>
  }
  return (
    <>
      {tweets &&
        tweets.map((tweet) => (
          <div key={tweet._id} className="mx-2 mt-3 row border-bottom">
            <div className="col-12">
              <div className="row">
                <div className="col-2">
                  <img
                    src={defaultPFP}
                    className="rounded-circle img-fluid"
                    alt="default avatar"></img>
                </div>
                <div className="col-10">
                  <h6 className="fw-bold my-0">{tweet.name}</h6>
                  <a
                    className="text-decoration-none text-secondary option"
                    href="github.com">
                    @{tweet.username}
                  </a>
                </div>
              </div>
              <div className="">
                <div className="border-bottom py-2">
                  <p className="fs-5">
                    {tweet.text}
                  </p>
                </div>
                <div className="d-flex text-secondary py-2 border-bottom">
                  <p className="mx-2 my-0">{tweet.createdAt}</p>
                </div>
                <div className="d-flex text-secondary py-2 border-bottom">
                  <p className="mx-2 my-0">{tweet.replyCount} Replies</p>
                  <p className="mx-2 my-0">{tweet.retweetCount} Retweets</p>
                  <p className="mx-2 my-0">{tweet.likesCount} Likes</p>
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
        ))}
    </>
  );
}

export default SingleTweet;