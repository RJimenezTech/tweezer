function Login() {
  return (
    <div className="row min-vh-100 bg-light">
      <div className="col-4 bg-img"></div>
      <div className="col-8">
        <div className="h-100 d-flex flex-column align-items-center justify-content-center">
          <form>
            <input
              className="form-input form-control mb-3"
              placeholder="Email"
              name="email"
              type="email"
              id="email"
            />
            <input
              className="form-input form-control"
              placeholder="Password"
              name="password"
              type="password"
              id="password"
            />
            <button
              className="my-4 btn text-light fw-bold primary btn-lg"
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
