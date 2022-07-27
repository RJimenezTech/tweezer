function Home() {
    return (
      <div className="row min-vh-100 bg-light">
        <div className="col-4 bg-img"></div>
        <div className="col-8">
          <div className="h-100 d-flex flex-column align-items-center justify-content-center">
            <h1 className="fw-bold">Babbl away, sign up today.</h1>
                    <button className="my-4 btn text-light fw-bold primary btn-lg">Sign up{/* anchor tag to signup page can go here*/ }</button>
            <p className="lead text-dark">Already have an account? Log in <a className="primary-link text-decoration-none" href="http://github.com">here{/* anchor tag to login page can go here*/ }</a>!</p>
          </div>
        </div>
      </div>
    );
}

export default Home;