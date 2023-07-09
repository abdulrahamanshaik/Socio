import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import ReplayIcon from "@mui/icons-material/Replay";


// import { formatDistanceToNow,parse } from 'date-fns';








import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import "./index.css";

import ReactPlayer from "react-player";
import { useState } from "react";

const Post = ({ post }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // const dateString = post.date;
  // const date = parse(dateString, "EEEE, MMMM d, yyyy 'at' h:mm a", new Date());
  // const timeAgo = formatDistanceToNow(date);


  
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
      <div className="post-image-wrapper">
        {post.type.includes("image") ? (
          <img className="post-image" src={post.url} alt="" />
        ) : (
          <div className="video-container">
            <ReactPlayer
              className="video-player"
              url={post.url}
              playing={isPlaying}
              muted={isMuted}
              // controls
              // loop
              width={"100%"}
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

              {isPlaying? (
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
        <FavoriteBorderIcon />
        <p>{post.likes} Likes</p>

        <ForumOutlinedIcon />
        <p>{post.comments} Comments</p>

        <ShareOutlinedIcon />
        <p>Shares</p>

        <TurnedInNotOutlinedIcon />
        <p>Save</p>
      </div>
    </div>
  );
};

export default Post;
