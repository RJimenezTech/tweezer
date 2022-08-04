import {React, useState} from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

function loggedInCheck() {
  if (Auth.loggedIn()) {
    window.location.assign("/feed");
  }
}

function Login() {
  loggedInCheck();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="row min-vh-100 bg-light w-100">
        <div className="col-lg-4 col-12 order-1 order-lg-1 bg-img"></div>
        <div className="col-lg-8 col-12 order-2 order-lg-2">
          <div className="h-100 d-flex flex-column align-items-center justify-content-center p-0">
            <h1 className="mb-4 fw-bold">Welcome back, homie!</h1>
            <form onSubmit={handleFormSubmit}>
              <input
                className="rounded-pill form-input form-control form-control-lg mb-3"
                placeholder="Email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="rounded-pill form-input form-control form-control-lg"
                placeholder="Password"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="rounded-pill my-4 btn text-light fw-bold primary btn-lg"
                type="submit">
                Lets go!
              </button>
            </form>
            <p className="fs-5 text-dark">
              Don't have an account yet? Sign up{" "}
              <a className="primary-link text-decoration-none" href="/signup">
                here
              </a>
              !
            </p>
        {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
