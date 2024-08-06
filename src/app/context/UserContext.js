"use client";
import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active_modal");
  } else {
    document.body.classList.remove("active_modal");
  }
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const logOutUser = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  // };

  return (
    <UserContext.Provider value={{ modal, setModal, toggleModal }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
