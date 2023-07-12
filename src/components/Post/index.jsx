import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./index.css";

import ReactPlayer from "react-player";
import { useState } from "react";

import { useInView } from "react-cool-inview";

const Post = ({ post, isMuted, setIsMuted }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const { observe, inView } = useInView();

  return (
    <div className="post">
      <div className="user-details-wrapper">
        <div>
          <img src={post.userPic} alt={post.userName} />
        </div>
        <div className="user-details">
          <p className="user-name">{post.userName}</p>
          <p className="posted-date">{post.date}</p>
        </div>
        <div className="save-btn">
          <MoreVertOutlinedIcon />
        </div>
      </div>
      <p>{post.desc}</p>
      <div className="post-image-wrapper">
        {post.type.includes("image") && (
          <img className="post-image" src={post.url} alt="" />
        )}
        {post.type.includes("video") && (
          <div className="video-container" ref={observe}>
            <ReactPlayer
              className="video-player"
              url={post.url}
              playing={inView && isPlaying}
              muted={isMuted}
              // controls
              // loop
              width={"100%"}
              height={"100%"}
              onEnded={() => setIsPlaying(false)}
            />
            <div className="video-controls">
              {isMuted ? (
                <VolumeUpIcon
                  onClick={() => setIsMuted(!isMuted)}
                  className="audioToggle"
                />
              ) : (
                <VolumeOffIcon
                  onClick={() => setIsMuted(!isMuted)}
                  className="audioToggle"
                />
              )}

              {isPlaying ? (
                <PauseIcon
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="playToggle"
                />
              ) : (
                <PlayArrowIcon
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="playToggle"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="post-interactions">
        <div className="interaction-wrappers">
          <FavoriteBorderIcon />
          <span>{post.likes} Likes</span>
        </div>
        <div className="interaction-wrappers">
          <ForumOutlinedIcon />
          <span>{post.comments} Comments</span>
        </div>

        <div className="interaction-wrappers">
          <ShareOutlinedIcon />
          <span>Share</span>
        </div>
        <div className="interaction-wrappers">
          <TurnedInNotOutlinedIcon />
          <span>Save</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
