import React from "react";

import Auth from "../../utils/auth";

const Settings = () => {
    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
    };

    return (
      <div className="row mx-2 border-bottom">
        <h3 className="option my-2" onClick={logout}>Logout</h3>
      </div>
    );
}

export default Settings;