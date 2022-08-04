import React, {useState} from 'react';
import TweetModal from '../../components/TweetModal';

import tweezer from "../../assets/images/tweezer.svg";

function Nav(props) {
    const {modalIsTweet, modalType, tweetId, show, handleShow} = props;

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (i) => {
        setToggleState(i);
        props.passData(i);
    }

    return (
      <>
      <div className="fs-3 d-flex d-lg-block justify-content-evenly align-items-center">
        <img src={tweezer} alt="tweezer logo" className="logo my-3 d-none d-lg-inline" />
        <div onClick={() => toggleTab(1)} className={ toggleState === 1 ? "active d-lg-flex flex-row my-2" : "option d-lg-flex flex-row my-2"}>
          <i className={toggleState === 1 ? "bi bi-house-fill mx-2" : "bi bi-house mx-2"}></i>
          <p className="my-auto mx-3 d-none d-lg-block">Home</p>
        </div>
        <div onClick={() => toggleTab(2)} className={ toggleState === 2 ? "d-none active d-lg-flex flex-row my-2" : "d-none option d-lg-flex flex-row my-2"}>
          <i className={toggleState === 2 ? "bi bi-search-heart-fill mx-2" : "bi bi-search-heart mx-2"}></i>
          <p className="my-auto mx-3 d-none d-lg-block">Explore</p>
        </div>
        <div onClick={() => toggleTab(3)} className={ toggleState === 3 ? "active d-lg-flex flex-row my-2" : "option d-lg-flex flex-row my-2"}>
          <i className={toggleState === 3 ? "bi bi-bell-fill mx-2" : "bi bi-bell mx-2"}></i>
          <p className="my-auto mx-3 d-none d-lg-block">Notifications</p>
        </div>
        <div onClick={() => toggleTab(4)} className={ toggleState === 4 ? "d-none active d-lg-flex flex-row my-2" : "d-none option d-lg-flex flex-row my-2"}>
          <i className={toggleState === 4 ? "bi bi-envelope-fill mx-2" : "bi bi-envelope mx-2"}></i>
          <p className="my-auto mx-3 d-none d-lg-block">Messages</p>
        </div>
        <div onClick={() => toggleTab(5)} className={ toggleState === 5 ? "d-none active d-lg-flex flex-row my-2" : "d-none option d-lg-flex flex-row my-2"}>
          <i className={toggleState === 5 ? "bi bi-bookmark-fill mx-2" : "bi bi-bookmark mx-2"}></i>
          <p className="my-auto mx-3 d-none d-lg-block">Bookmarks</p>
        </div>
        <div onClick={() => toggleTab(6)} className={ toggleState === 6 ? "d-none active d-lg-flex flex-row my-2" : "d-none option d-lg-flex flex-row my-2"}>
          <i className={toggleState === 6 ? "bi bi-sticky-fill mx-2" : "bi bi-sticky mx-2"}></i>
          <p className="my-auto mx-3 d-none d-lg-block">Lists</p>
        </div>
        <div onClick={() => toggleTab(7)} className={ toggleState === 7 ? "active d-lg-flex flex-row my-2" : "option d-lg-flex flex-row my-2"}>
          <i className={toggleState === 7 ? "bi bi-person-fill mx-2" : "bi bi-person mx-2"}></i>
          <p className="my-auto mx-3 d-none d-lg-block">Profile</p>
        </div>
        <div onClick={() => toggleTab(8)} className={ toggleState === 8 ? "active d-lg-flex flex-row my-2" : "option d-lg-flex flex-row my-2"}>
          <i className={toggleState === 8 ? "bi bi-gear-fill mx-2" : "bi bi-gear mx-2"}></i>
          <p className="my-auto w-100 d-none mx-3 d-lg-block">Settings</p>
        </div>
        <button onClick={()=>{handleShow();modalIsTweet()}} className="my-4 w-100 d-none d-lg-inline rounded-pill btn text-light fw-bold primary btn-lg">
          Tweet
        </button>
        <button onClick={()=>{handleShow();modalIsTweet()}} className="my-3 mx-2 d-lg-none rounded-pill btn text-light fw-bold primary">
          Tweet
        </button>
      </div>
      <TweetModal tweetId={tweetId} show={show} modalType={modalType} handleShow={handleShow}/>
      </>
    );
}

export default Nav;