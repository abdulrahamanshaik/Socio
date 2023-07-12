import Post from "../Post/index";
import { AllPosts, Users } from "../../data";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import CircularProgress from "@mui/material/CircularProgress";

import "./index.css";
import { useState, useEffect } from "react";

const Posts = () => {
  const [isMuted, setIsMuted] = useState(true);

  // console.log(AllPosts);
  const [postsList, setPostsList] = useState([]);
  const collectionRef = collection(db, "Posts");

  useEffect(() => {
    const getPosts = async () => {
      const dataList = await getDocs(collectionRef);
      setPostsList(dataList.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(dataList);
    };
    getPosts();
  }, []);
  // console.log(postsList);
  return (
    <div className="posts">
      {postsList.length === 0 && (
        <div className="loader-wrapper">
          <CircularProgress />
        </div>
      )}

      {postsList.map((post) => {
        // console.log(post);
        // const user = Users.find((user) => user.id === post.userId);

        return (
          <Post
            post={post}
            key={post.id}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
        );
        // user={user}
      })}
    </div>
  );
};

export default Posts;
