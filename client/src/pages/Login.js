import React from "react";

function Login() {
  return (
    <div className="row w-100 min-vh-100 bg-light">
      <div className="col-4 bg-img"></div>
      <div className="col-8">
        <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <h1 className="mb-4 fw-bold">Welcome back, homie!</h1>
          <form>
            <input
              className="rounded-pill form-input form-control form-control-lg mb-3"
              placeholder="Email"
              name="email"
              type="email"
              id="email"
            />
            <input
              className="rounded-pill form-input form-control form-control-lg"
              placeholder="Password"
              name="password"
              type="password"
              id="password"
            />
            <button
              className="rounded-pill my-4 btn text-light fw-bold primary btn-lg"
              type="submit">
              Lets go!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
