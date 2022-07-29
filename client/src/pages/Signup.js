import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <div className="row w-100 min-vh-100 bg-light">
      <div className="col-4 bg-img"></div>
      <div className="col-8">
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
              type="submit"
            >
              Lets go!
            </button>
          </form>
          {error && <div>Sign-up failed</div>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
