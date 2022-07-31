import React from "react";

import Auth from "../../utils/auth";

const Settings = (tab) => {
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    };

    return (
      <div className="row mx-2 border-bottom">
        <header className="text-dark fs-5 fw-bold bg-light home-header">
          <p className="p-3 header-text">Settings</p>
        </header>
        <h3 className="option my-2" onClick={logout}>
          Logout
        </h3>
      </div>
    );
}

export default Settings;