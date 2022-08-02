import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Auth from "../../utils/auth";
import {useMutation} from '@apollo/client';
import {ADD_TWEET} from '../../utils/mutations';
import {QUERY_ME_ALL, QUERY_ALL_TWEETS} from '../../utils/queries';


import tweezer from "../../assets/images/tweezer.svg";
import defaultPFP from "../../assets/images/default-pfp.jpg";

function Nav(props) {
    const myUserId = Auth.getProfile().data._id;
    const myUsername = Auth.getProfile().data.username;
    const [text, setFormState] = useState("");

    const [addTweet, { error }] = useMutation(ADD_TWEET, {
      update(cache, { data: { addTweet } }) {
        
          // could potentially not exist yet, so wrap in a try/catch
        try {
          // update me array's cache
          const { me } = cache.readQuery({ query: QUERY_ME_ALL });
          cache.writeQuery({
            query: QUERY_ME_ALL,
            data: { me: { ...me, tweets: [...me.tweets, addTweet] } },
          });
        } catch (e) {
          console.warn("First thought insertion by user!")
        }
  
        // update thought array's cache
        const { tweets } = cache.readQuery({ query: QUERY_ALL_TWEETS });
        cache.writeQuery({
          query: QUERY_ALL_TWEETS,
          data: { tweets: [addTweet, ...tweets] },
        });
      }
    });
    
    const handleChange = (event) => {
      if (event.target.value.length <= 280) {
        setFormState(event.target.value);
      }
    };

    const handleFormSubmit = async (event) => {
      console.log(myUserId, text);
      try {
        await addTweet({
        variables: {userId: myUserId, text: text, username: myUsername}
        });
        setFormState("");
      } catch (e) {
        console.error(e);
      }
      
    };

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (i) => {
        setToggleState(i);
        props.passData(i);
    }

      // modal logic
    const [show, setShow] = useState(false);
    const handleShow = () => {
      if (show === false) {
        setShow(true)
      } else {
        setShow(false);
      }
    };


    
    return (
      <>
      <div className="fs-3">
        <img src={tweezer} alt="tweezer logo" className="logo my-3" />
        <div onClick={() => toggleTab(1)} className={ toggleState === 1 ? "active d-flex flex-row my-2" : "option d-flex flex-row my-2"}>
          <i className={toggleState === 1 ? "bi bi-house-fill mx-2" : "bi bi-house mx-2"}></i>
          <p className="my-auto mx-3">Home</p>
        </div>
        <div onClick={() => toggleTab(2)} className={ toggleState === 2 ? "active d-flex flex-row my-2" : "option d-flex flex-row my-2"}>
          <i className={toggleState === 2 ? "bi bi-search-heart-fill mx-2" : "bi bi-search-heart mx-2"}></i>
          <p className="my-auto mx-3">Explore</p>
        </div>
        <div onClick={() => toggleTab(3)} className={ toggleState === 3 ? "active d-flex flex-row my-2" : "option d-flex flex-row my-2"}>
          <i className={toggleState === 3 ? "bi bi-bell-fill mx-2" : "bi bi-bell mx-2"}></i>
          <p className="my-auto mx-3">Notifications</p>
        </div>
        <div onClick={() => toggleTab(4)} className={ toggleState === 4 ? "active d-flex flex-row my-2" : "option d-flex flex-row my-2"}>
          <i className={toggleState === 4 ? "bi bi-envelope-fill mx-2" : "bi bi-envelope mx-2"}></i>
          <p className="my-auto mx-3">Messages</p>
        </div>
        <div onClick={() => toggleTab(5)} className={ toggleState === 5 ? "active d-flex flex-row my-2" : "option d-flex flex-row my-2"}>
          <i className={toggleState === 5 ? "bi bi-bookmark-fill mx-2" : "bi bi-bookmark mx-2"}></i>
          <p className="my-auto mx-3">Bookmarks</p>
        </div>
        <div onClick={() => toggleTab(6)} className={ toggleState === 6 ? "active d-flex flex-row my-2" : "option d-flex flex-row my-2"}>
          <i className={toggleState === 6 ? "bi bi-sticky-fill mx-2" : "bi bi-sticky mx-2"}></i>
          <p className="my-auto mx-3">Lists</p>
        </div>
        <div onClick={() => toggleTab(7)} className={ toggleState === 7 ? "active d-flex flex-row my-2" : "option d-flex flex-row my-2"}>
          <i className={toggleState === 7 ? "bi bi-person-fill mx-2" : "bi bi-person mx-2"}></i>
          <p className="my-auto mx-3">Profile</p>
        </div>
        <div onClick={() => toggleTab(8)} className={ toggleState === 8 ? "active d-flex flex-row my-2" : "option d-flex flex-row my-2"}>
          <i className={toggleState === 8 ? "bi bi-gear-fill mx-2" : "bi bi-gear mx-2"}></i>
          <p className="my-auto w-100 mx-3">Settings</p>
        </div>
        <button onClick={()=>handleShow()} className="my-4 w-100 rounded-pill btn text-light fw-bold primary btn-lg">
          Tweet
        </button>
      </div>
      
      <Modal dialogClassName="my-modal" show={show} onHide={()=>handleShow()}>
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
      </>
    );
}

export default Nav;