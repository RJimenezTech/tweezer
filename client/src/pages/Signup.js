import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '', });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  console.log(formState)

  // submit form
// submit form (notice the async!)
  const handleFormSubmit = async event => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
    
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="row min-vh-100 bg-light">
      <div className="col-lg-4 col-12 order-1 order-lg-1 bg-img"></div>
      <div className="col-lg-8 col-12 order-2 order-lg-2">
        <div className="h-100 d-flex flex-column align-items-center justify-content-center">
          <h1 className="mb-4 fw-bold">Welcome!</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              className="rounded-pill form-input form-control form-control-lg mb-3"
              placeholder="Username"
              name="username"
              type="username"
              id="username"
              value={formState.username}
              onChange={handleChange}
            />
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
            Already have an account? Log in{" "}
            <a className="primary-link text-decoration-none" href="/login">
              here
            </a>
            !
          </p>
          {error && <div>Sign-up failed</div>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
