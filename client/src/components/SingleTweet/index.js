import React, {useState}from "react";

import Auth from "../../utils/auth";
import {useMutation, useQuery} from '@apollo/client';
import {LIKE_TWEET} from '../../utils/mutations';
import { QUERY_ONE_USER} from '../../utils/queries';
import defaultPFP from "../../assets/images/default-pfp.jpg";

function SingleTweet(props) {
  const {thisTweetId, tweets, setTweetId, modalIsReply, handleShow} = props;
  const myUserId = Auth.getProfile().data._id;
  const myUsername = Auth.getProfile().data.username;
  const [like, setLike] = useState(false)
  
  const {data} = useQuery(QUERY_ONE_USER, 
    {
      variables: {username: myUsername}
    });
  console.log(data)
  const [likeTweet] = useMutation(LIKE_TWEET);

  // const handleLikeColor = (tweetId) => {
  //   const isLiked = myLikes.map((tweet) => tweet._id).includes(tweetId)
    
  //   if (isLiked) {
  //     return true;
  //   } else return false;
  // }

  const handleLike = async (event) => {
    try {
      await likeTweet({
        variables: {userId: myUserId, tweetId: thisTweetId}
      })
      // handleLikeColor();
    } catch (e) {
      console.error(e);
    }
  }

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
                  <p className="mx-2 my-0" ><span className="option fw-semibold">{tweet.replyCount}</span> Replies</p>
                  <p className="mx-2 my-0"><span className="option fw-semibold">{tweet.retweetCount}</span> Retweets</p>
                  <p className="mx-2 my-0"><span className="option fw-semibold">{tweet.likesCount}</span> Likes</p>
                </div>
                <div className="d-flex text-secondary justify-content-around py-2 fs-4 border-bottom">
                  <i className="bi bi-reply mx-1 option" onClick={()=>{handleShow();setTweetId(tweet._id);modalIsReply()}}></i>
                  <i className="bi bi-arrow-repeat mx-1 option"></i>
                  {/*handleLikeColor(tweet._id) ? <i className="bi bi-heart-fill mx-1 active" onClick={()=>{handleLike();setTweetId(tweet._id)}}></i> 
                  :*/} <i className="bi bi-heart mx-1 option" onClick={()=>{handleLike();setTweetId(tweet._id)}}></i>
                  {/* <i className="bi bi-heart mx-1 option"></i> */}
                  <i className="bi bi-share mx-1 option"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default SingleTweet;