import React, { useEffect, useState } from "react";
import "./index.css";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import SimpleDialogDemo from "../Model";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data.user);
        localStorage.setItem("isLoggedIn", true);

        localStorage.setItem("user", JSON.stringify(data.user));
        console.log(data.user.displayName);
      })
      .catch((err) => console.error(err));
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setUserData([]);
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    setUserData(JSON.parse(localStorage.getItem("user")));
    // console.log(userData);
  }, []);

  return (
    <div className="profile-wrapper">
      {!isLoggedIn ? (
        <button onClick={signIn}>SignIn With Google</button>
      ) : (
        <div className="profile-details">
          <img
            className="userProfilePic"
            src={userData.photoURL}
            alt={userData.displayName}
          />
          <h1>{userData.displayName}</h1>
          <div className="profile-buttons-wrapper">
            <SimpleDialogDemo />
            {/* <button >Post Socio</button> */}
            <button onClick={logOut}>LOGOUT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
