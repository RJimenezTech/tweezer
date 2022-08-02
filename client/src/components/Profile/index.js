import React from "react";
// import { Navigate, useParams} from "react-router-dom"
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";

import { QUERY_ONE_USER} from "../../utils/queries";

import defaultPFP from "../../assets/images/default-pfp.jpg";
import SingleTweet from '../SingleTweet';

const Profile = (tab) => {
  // const dummyName = "CedrickSporer.Reynolds93"
  const myUsername = Auth.getProfile().data.username;
  const { data } = useQuery(QUERY_ONE_USER, {
    variables: { username: myUsername },
  });

  const user = data?.user || {};
  

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
              alt="default avatar"
            ></img>
            <button className="rounded-pill btn btn-md text-light fw-bold primary">
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
            <a className="my-0 text-info text-decoration-none option" href={user.url }>{user.url}</a>
          </div>
          <div className="d-flex mb-3">
            <p className="my-0 me-3"><span className="option fw-semibold">{user.followingCount}</span> Following</p>
            <p className="my-0"><span className="option fw-semibold">{user.followerCount}</span> Followers</p>
          </div>
        </div>
      </div>
      <SingleTweet tweets={user.tweets} />
    </>
  );
};

export default Profile;
