import React from "react";

// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';

// import Auth from '../utils/auth';


const Signup = () => {
//   const [formState, setFormState] = useState({ username: '', email: '', password: '' });
//   const [addUser, { error }] = useMutation(ADD_USER);

//   // update state based on form input changes
//   const handleChange = event => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value
//     });
//   };

//   // submit form
// // submit form (notice the async!)
// const handleFormSubmit = async event => {
//   event.preventDefault();

//   // use try/catch instead of promises to handle errors
//   try {
//     // execute addUser mutation and pass in variable data from form
//     const { data } = await addUser({
//       variables: { ...formState }
//     });
  
//     Auth.login(data.addUser.token);
//   } catch (e) {
//     console.error(e);
//   }
// };

  return (
    <div className="row w-100 min-vh-100 bg-light">
      <div className="col-4 bg-img"></div>
      <div className="col-8">
        <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <h1 className="mb-4 fw-bold">Welcome!</h1>
          <form>
            <input
              className="rounded-pill form-input form-control form-control-lg mb-3"
              placeholder="Username"
              name="username"
              type="username"
              id="username"
            />
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
              type="submit"
            >
              Lets go!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
