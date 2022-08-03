import React, {useState}from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Auth from "../../utils/auth";
import {useMutation} from '@apollo/client';
import {REPLY_TWEET, ADD_TWEET} from '../../utils/mutations';
import {QUERY_ALL_TWEETS, QUERY_ME_BASIC} from '../../utils/queries';
import defaultPFP from "../../assets/images/default-pfp.jpg";


function TweetModal(props) {
    const myUserId = Auth.getProfile().data._id;
    const myUsername = Auth.getProfile().data.username;
    const { thisTweetId, show, handleShow, modalType} = props;
    const [text, setFormState] = useState("");
    const [addTweet] = useMutation(ADD_TWEET,{
        update(cache, { data: {addTweet}}) {

          try {
            const {me} = cache.readQuery({query: QUERY_ME_BASIC});
            cache.writeQuery({
              query: QUERY_ME_BASIC,
              data: {me: {...me, tweets: [...me.tweets, addTweet]}},
            });
          } catch (e) {
            console.warn("Tweeted!")
          }
          const {tweets} = cache.readQuery({query:QUERY_ALL_TWEETS});
          cache.writeQuery({
            query: QUERY_ALL_TWEETS, 
            data: {tweets: [addTweet, ...tweets]},
          });
        } 
      }
    );

    const [reply] = useMutation(REPLY_TWEET
    //   , {
    //     variables: {userId: myUserId, text: text, tweetId: thisTweetId}
    // }
    );

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
          setFormState(event.target.value);
        }
    };

    const handleFormSubmit = async (event) => {
        console.log(myUserId, text);
        try {
        
          if (modalType==="tweet") {
            await addTweet({
            variables: {userId: myUserId, text: text, username: myUsername}
            });
            setFormState("")
          } else {
            await reply({
            variables: {userId: myUserId, text: text, tweetId: thisTweetId}
            });
            setFormState("");
          }

        } catch (e) {
          console.error(e);
        }
        
      };

    return (
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
            Tweet
            </Button>
        </Modal.Footer>
        </Form>
        </Modal>

    )

}

export default TweetModal;