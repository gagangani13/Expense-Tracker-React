import React, { useState } from "react";
import UserContext from "./UserContext";
const UserProvider = (props) => {
  const [profileTab, setProfileTab] = useState(false);
  function profileButtonHandler(params) {
    setProfileTab(params);
  }
  const userCtx = {
    updateProfile: {
      profileButton: profileTab,
      profileButtonFunction: profileButtonHandler,
    }
  }
  return (
    <UserContext.Provider value={userCtx}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
