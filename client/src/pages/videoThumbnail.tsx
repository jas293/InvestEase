import React from "react";
import YouTube from "react-youtube";

interface VideoThumbnailProps {
    videoId: string;
    title: string;
  }

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoId, title }) => {
    console.log("VideoId", videoId);
  // Options for the YouTube player
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div className="video-thumbnail">
      <YouTube videoId={videoId} opts={opts} />
      <h3>
        {title}
      </h3>
    </div>
  );
};

export default VideoThumbnail;
