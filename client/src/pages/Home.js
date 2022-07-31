import React from "react";

function Home() {
    return (
      <div className="row w-100 min-vh-100 bg-light">
        <div className="col-4 bg-img"></div>
        <div className="col-8">
          <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <h1 className="fw-bold">Talk with Tweezer, sign up today.</h1>
            <button className="rounded-pill my-4 btn text-light fw-bold primary btn-lg">
              <a href="/signup" className="text-decoration-none text-light">
                Sign up
              </a>
            </button>
            <p className="fs-5 text-dark">
              Already have an account? Log in{" "}
              <a
                className="primary-link text-decoration-none"
                href="/login"
              >
                here
              </a>
              !
            </p>
          </div>
        </div>
      </div>
    );
}

export default Home;