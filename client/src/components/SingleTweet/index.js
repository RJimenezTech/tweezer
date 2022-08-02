import React, {useState}from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Auth from "../../utils/auth";
import {useMutation} from '@apollo/client';
import {REPLY_TWEET, LIKE_TWEET} from '../../utils/mutations';
import defaultPFP from "../../assets/images/default-pfp.jpg";

function SingleTweet({ tweets }) {
  const myUserId = Auth.getProfile().data._id;
  const [like, setLike] = useState(false)
  const [text, setFormState] = useState("");
  const [tweetId, setTweetId] = useState("");
  const [replyTweet] = useMutation(REPLY_TWEET);
  const [likeTweet] = useMutation(LIKE_TWEET);
  // modal logic
  const [show, setShow] = useState(false);
  const handleShow = () => {
    if (show === false) {
      setShow(true)
      console.log("show")
    } else {
      setShow(false);
      console.log("not show");
    }
  };

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setFormState(event.target.value);
    }
  };

  const handleLikeColor = () => {
    if (like === false) {
      setLike(true);
    } else {
      setLike(false);
    }
  }
  const handleLike = async (event) => {
    try {
      await likeTweet({
        variables: {userId: myUserId, tweetId: tweetId}
      })
      handleLikeColor();
    } catch (e) {
      console.error(e);
    }
  }

  const handleFormSubmit = async (event) => {
    console.log(myUserId, text, tweetId);
    try {
      await replyTweet({
      variables: {userId: myUserId, text: text, tweetId: tweetId}
      });
      setFormState("");
      setTweetId("");
    } catch (e) {
      console.error(e);
    }
    
  };


  // if (!tweets) {
  //   return <h5>No tweets yet!</h5>
  // }
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
                  <p className="mx-2 my-0" >{tweet.replyCount} Replies</p>
                  <p className="mx-2 my-0">{tweet.retweetCount} Retweets</p>
                  <p className="mx-2 my-0">{tweet.likesCount} Likes</p>
                </div>
                <div className="d-flex text-secondary justify-content-around py-2 fs-4 border-bottom">
                  <i className="bi bi-reply mx-1 option" onClick={()=>{handleShow();setTweetId(tweet._id)}}></i>
                  <i className="bi bi-arrow-repeat mx-1 option"></i>
                  {like ? <i className="bi bi-heart-fill mx-1 option" onClick={()=>{handleLike()}}></i> 
                  : <i className="bi bi-heart mx-1 option" onClick={()=>{handleLike()}}></i>}
                  
                  <i className="bi bi-share mx-1 option"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Modal show={show} onHide={()=>handleShow()}>
        <Modal.Header closeButton>
            <Modal.Title>Create Tweet</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
            <Modal.Body>
                <div className="row mx-2">
                  <div className="col-2">
                      <img
                      src={defaultPFP}
                      className="rounded-circle img-fluid"
                      alt="default avatar"
                      ></img>
                  </div>
                  <div className="col-10">
                      <div>
                          <textarea
                              value={text}
                              id="tweet-input"
                              rows="7"
                              placeholder="What's going on?"
                              className="fs-5 bg-light border border-0 w-100 h-250"
                              maxLength="240"
                              onChange={handleChange}
                          ></textarea>
                      </div>
                  </div>
                </div>
            </Modal.Body>
        <Modal.Footer className="d-flex">
            <div className="d-flex flex-row align-items-center justify-content-between pl-3">
              <div className="fs-4">
                  <i className="bi bi-image mx-1 option"></i>
                  <i className="bi bi-filetype-gif mx-1 option"></i>
                  <i className="bi bi-clipboard-data mx-1 option"></i>
                  <i className="bi bi-emoji-kiss mx-1 option"></i>
                  <i className="bi bi-calendar mx-1 option"></i>
                  <i className="bi bi-geo-alt mx-1 option"></i>
              </div>
            </div>
            <Button className="my-2 w-25 rounded-pill btn text-light fw-bold primary btn-md"
              onClick={()=> {handleShow();handleFormSubmit()}}
            >
            Reply
            </Button>
        </Modal.Footer>
        </Form>
        </Modal>
    </>
  );
}

export default SingleTweet;