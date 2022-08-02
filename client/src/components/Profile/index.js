import React, {useState} from "react";
// import { Navigate, useParams} from "react-router-dom"
import TweetModal from '../../components/TweetModal';
import { Modal, Form, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

import { QUERY_ONE_USER } from "../../utils/queries";
import { UPDATE_USER_PROFILE } from "../../utils/mutations";

import defaultPFP from "../../assets/images/default-pfp.jpg";
import SingleTweet from '../SingleTweet';

const Profile = (props) => {
  const {modalType, modalIsTweet, modalIsReply, show, handleShow} = props;
  const [thisTweetId, setTweetId] = useState("");
  const myUsername = Auth.getProfile().data.username;
  const myId = Auth.getProfile().data._id;
  const { data } = useQuery(QUERY_ONE_USER, {
    variables: { username: myUsername },
  });

  const user = data?.user || {};

  const [update, { error }] = useMutation(UPDATE_USER_PROFILE);

  
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => {
    if (showEdit === false) {
      setShowEdit(true);
      console.log("show");
    } else {
      setShowEdit(false);
      console.log("not show");
    }
  };
  
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    url: "",
    userId: myId
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // const [show, setShow] = useState(false);
  // const handleShow = () => {
  //   if (show === false) {
  //     setShow(true);
  //     console.log("show");
  //   } else {
  //     setShow(false);
  //     console.log("not show");
  //   }
  // };
  
  const handleFormSubmit = async () => {

    try {
      const { data } = await update({
        variables: { ...formState }
      });
    } catch (e) {
      console.error(e);
    }

    console.log(formState);


    // clear form values
    setFormState({
      name: "",
      description: "",
      url: "",
      userId: myId
    });
  };

  return (
    <>
      <div className="row mx-2 border-bottom">
        <header className="text-dark fs-5 fw-bold bg-light home-header">
          <p className="p-3 header-text">Profile</p>
        </header>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <img
              src={defaultPFP}
              className="rounded-circle img-fluid h-50"
              alt="default avatar"></img>
            <button
              onClick={() => handleShowEdit()}
              className="rounded-pill btn btn-md text-light fw-bold primary">
              Edit Profile
            </button>
          </div>
          <div className="">
            <p className="my-0 fw-bold fs-5">{user.name}</p>
            <p className="my-0 text-secondary option">@{user.username}</p>
          </div>
          <div className="my-3">
            <p className="my-0">{user.description}</p>
          </div>
          <div className="mb-3">
            <a
              className="my-0 text-decoration-none option"
              href={user.url}>
              {user.url}
            </a>
          </div>
          <div className="d-flex mb-3">
            <p className="my-0 me-3">
              <span className="option fw-semibold">{user.followingCount}</span>{" "}
              Following
            </p>
            <p className="my-0">
              <span className="option fw-semibold">{user.followerCount}</span>{" "}
              Followers
            </p>
          </div>
        </div>
      </div>
      <SingleTweet
        tweets={user.tweets}
        show={show}
        handleShow={handleShow}
        modalType={modalType}
        modalIsReply={modalIsReply}
        setTweetId={setTweetId}
        thisTweetId={thisTweetId}
      />
      <Modal show={showEdit} onHide={() => handleShowEdit()}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title>Profile Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div className="row mx-2">
            <div className="col-2">
              <img
                src={defaultPFP}
                className="rounded-circle img-fluid"
                alt="default avatar"></img>
            </div>
            <div className="col-10">
              <div>
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="rounded-pill form-input form-control mb-3"
                    placeholder="Display name..."
                    name="name"
                    type="name"
                    id="name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <textarea
                    className="rounded form-input form-control mb-3"
                    placeholder="Description..."
                    name="description"
                    type="description"
                    id="description"
                    value={formState.description}
                    onChange={handleChange}></textarea>
                  <input
                    className="rounded-pill form-input form-control "
                    placeholder="Site"
                    name="url"
                    type="url"
                    id="url"
                    value={formState.url}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex bg-light">
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
          <Button
            className="my-2 w-25 border-0 rounded-pill btn text-light fw-bold primary btn-md"
            onClick={() => {
              handleShowEdit();
              handleFormSubmit();
            }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
