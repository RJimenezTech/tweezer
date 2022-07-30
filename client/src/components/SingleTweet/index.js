import React from "react";

import defaultPFP from "../../assets/images/default-pfp.jpg";


function SingleTweet() {
    return (
        <div className="row mx-2 mt-3 border-bottom">
            <div className="col-2">
                <img
                    src={defaultPFP}
                    className="rounded-circle img-fluid"
                    alt="default avatar"
                ></img>
            </div>
            <div className="col-10">
                <div className="border-bottom">
                    <p className="fs-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim odit ea ut inventore ducimus error.</p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex text-secondary">
                        <p className="mx-2">Retweets</p>
                        <p className="mx-2">Quotes</p>
                        <p className="mx-2">Likes</p>
                    </div>
                    <button className="my-4 w-25 rounded-pill btn text-light fw-bold primary btn-md">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleTweet;