import React from "react";
import SingleTweet from '../SingleTweet';

import {useQuery} from "@apollo/client";
import {QUERY_ONE_USER } from "../../utils/queries";
import defaultPFP from "../../assets/images/default-pfp.jpg";

const Profile = (tab) => {
  // const dummyName = "CedrickSporer.Reynolds93"
  const {loading, data, error} = useQuery(QUERY_ONE_USER, 
    {variables: {username: "CedrickSporer.Reynolds93"},}
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error.message}</h2>;

  const user = data?.me || data?.user || {};

  return (
    <div className="row mx-2 border-bottom">
      <header className="text-dark fs-5 fw-bold bg-light home-header">
        <p className="p-3 header-text">Profile</p>
      </header>
      <div className="col-2">
        <img
          src={defaultPFP}
          className="rounded-circle img-fluid"
          alt="default avatar"></img>
      </div>
      <p>{user.username}</p>
      <p>{user.description}</p>
      <p>{user.url}</p>
      <SingleTweet tweets={user.tweets}/>
    </div>
  );
};

export default Profile;
