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
        <button onClick={()=>{handleShow();modalIsTweet()}} className="my-4 w-100 rounded-pill btn text-light fw-bold primary btn-lg">
          Tweet
        </button>
      </div>
      <TweetModal tweetId={tweetId} show={show} modalType={modalType} handleShow={handleShow}/>
      </>
    );
}

export default Nav;