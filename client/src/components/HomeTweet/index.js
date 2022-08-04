import React, {useState} from "react";
import SingleTweet from "../SingleTweet"

import { useQuery } from "@apollo/client";
import { QUERY_ALL_TWEETS } from "../../utils/queries";
import TweetModal from '../TweetModal';

import defaultPFP from "../../assets/images/default-pfp.jpg";

function HomeTweet(props) {
  const {modalType, modalIsTweet, modalIsReply, show, handleShow} = props;
  const [thisTweetId, setTweetId] = useState("");
  const { data } = useQuery(QUERY_ALL_TWEETS);
  console.log(data);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  const tweets = data?.tweets || [];
  return (
    <>
      <header className="w-100 text-dark text-sm-center fs-5 fw-bold bg-light home-header">
        <p className="p-3 header-text">Home</p>
      </header>
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
            <button onClick={()=>{modalIsTweet();handleShow()}}className="my-4 w-25 rounded-pill btn text-light fw-bold primary btn-md">
              Tweet
            </button>
          </div>
        </div>
      </div>
      <SingleTweet tweets={tweets} show={show} handleShow={handleShow} modalType={modalType} modalIsReply={modalIsReply} setTweetId={setTweetId} thisTweetId={thisTweetId}/>
      <TweetModal show={show} handleShow={handleShow} modalType={modalType} modalIsTweet={modalIsTweet} thisTweetId={thisTweetId}/>
    </>
    );
}

export default HomeTweet;