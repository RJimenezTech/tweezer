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

import {useQuery} from '@apollo/client';
import {QUERY_ONE_USER} from "../utils/queries";
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
  // const myUsername = Auth.getProfile().data.username;
  // const {data} = useQuery(QUERY_ONE_USER, {
  //   variables: {username: myUsername}
  // });
  // console.log(data)
  // const {user} = data;
  // console.log(user);
  return (
    <main>
      {loggedIn ? (
        <div className="row bg-light min-vh-100">
          <div className="col-lg-4 col-12 order-2 order-lg-1 d-flex justify-content-center justify-content-lg-end text-dark">
            <Nav 
            passData={passData} 
            show={show}
            handleShow={handleShow}
            modalType={modalType} 
            modalisReply={modalIsReply} 
            modalIsTweet={modalIsTweet}></Nav>
          </div>
          <div className="col-lg-4 col-12 order-1 order-lg-2 border center-feed">
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
            modalIsTweet={modalIsTweet} 
            // data={data}
            />}
            {currentTab === 8 && <Settings />}
          </div>
          <div className="col-lg-4 d-none"></div>
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