import { React, useState } from "react";

import Nav from "../components/Nav";
import HomeTweet from "../components/HomeTweet";
import Explore from "../components/Explore";
import Notifications from "../components/Notifications";
import Messages from "../components/Messages";
import Bookmarks from "../components/Bookmarks";
import Lists from "../components/Lists";
import Profile from "../components/Profile";
import Settings from "../components/Settings";

import Auth from "../utils/auth";

function Feed() {
  const loggedIn = Auth.loggedIn();
  // default tab is Home
  const [currentTab, setCurrentTab] = useState(1);
  const passData = (currentTab) => {
    setCurrentTab(currentTab);
  };

  const [modalType, setModalType] = useState("");
  const modalIsReply = () => setModalType("reply");
  const modalIsTweet = () => setModalType("tweet");
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
    <main>
      {loggedIn ? (
        <div className="row bg-light w-100 min-vh-100">
          <div className="col-4 d-flex justify-content-end text-dark">
            <Nav 
            passData={passData} 
            show={show}
            handleShow={handleShow}
            modalType={modalType} 
            modalisReply={modalIsReply} 
            modalIsTweet={modalIsTweet}></Nav>
          </div>
          <div className="col-4 border center-feed">
            {currentTab === 1 && <HomeTweet 
            show={show}
            handleShow={handleShow}
            modalType={modalType} 
            modalIsReply={modalIsReply} 
            modalIsTweet={modalIsTweet}/>}
            {currentTab === 2 && <Explore />}
            {currentTab === 3 && <Notifications />}
            {currentTab === 4 && <Messages />}
            {currentTab === 5 && <Bookmarks />}
            {currentTab === 6 && <Lists />}
            {currentTab === 7 && <Profile
            show={show}
            handleShow={handleShow}
            modalType={modalType} 
            modalIsReply={modalIsReply} 
            modalIsTweet={modalIsTweet} />}
            {currentTab === 8 && <Settings />}
          </div>
          <div className="col-4"></div>
        </div>
      ) : (
        <div>
          <h1>You must be logged in to view this page!</h1>
        </div>
      )}
    </main>
  );
};

export default Feed;