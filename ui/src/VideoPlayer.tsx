import React, {
  Fragment,
  RefObject,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import { useParams, Link } from "react-router-dom";
import { fetchVideo } from "./api";
import { Video, VideoResponse } from "./types";

const options = ["240p", "480p", "1080p", "4k"];

function VideoPlayer() {
  const [video, setVideo] = useState<Video | null>(null);
  const [resolution, setResolution] = useState<string>(options[1]);
  let { videoId } = useParams<{ videoId: string }>();

  const videoRef: RefObject<HTMLVideoElement> | null = useRef(null);

  useEffect(() => {
    fetchVideo(videoId).then((data: VideoResponse<Video>) => {
      if (data.data) {
        setVideo(data.data);
      }
    });
  }, [videoId]);

  const handleUpdateResolution = async (
    event: ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    setResolution(event.target.value);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  if (!video) {
    return <Link to="/">View all videos</Link>;
  }

  return (
    <Fragment>
      <Link to="/">View all videos</Link>
      <h1>{video.title}</h1>
      <video ref={videoRef} controls autoPlay>
        <source
          src={`${process.env.PUBLIC_URL}/${video.title}-${resolution}.mp4`}
          type="video/mp4"
        />
      </video>
      <select value={resolution} onChange={handleUpdateResolution}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </Fragment>
  );
}

export default VideoPlayer;
