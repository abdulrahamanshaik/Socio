import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import CircularProgress from "@mui/material/CircularProgress";

import "./index.css";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import SimpleDialogDemo from "../Model";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const collectionRef = collection(db, "Users");

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data.user);

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(data.user));
        const currentDate = new Date();
        const options = {
          weekday: "long", // Full weekday name (e.g., Monday)
          year: "numeric", // 4-digit year
          month: "long", // Full month name (e.g., January)
          day: "numeric", // Day of the month (e.g., 1, 2, 3)
        };
        const formattedDate = currentDate.toLocaleString("en-US", options);
        addDoc(collectionRef, {
          Name: data.user.displayName,
          Email: data.user.email,
          Date: formattedDate,
          Profilepic: data.user.photoURL,
          Userid: data.user.uid,
        })
          .then((res) => {
            alert("Login Successful");
            console.log(res);
          })
          .catch((err) => console.error(err));
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

    const getPosts = async () => {
      const dataList = await getDocs(collectionRef);
      setUsersList(dataList.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
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
          <p className="all-users-text">All Users</p>

          {usersList.length < 1 ? (
            <CircularProgress />
          ) : (
            <div className="all-users">
              {usersList.map((user) => {
                return (
                  <div className="all-users-item" key={user.id}>
                    <img
                      className="userProfilePic"
                      src={user.Profilepic}
                      alt={user.Name}
                    />
                    <div className="all-users-details">
                      <span>{user.Name}</span>
                      <span>{user.Date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
