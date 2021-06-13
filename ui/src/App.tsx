import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { fetchVideos } from "./api";
import { Video, VideoResponse } from "./types";
import VideoPlayer from "./VideoPlayer";

function App() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos().then((res: VideoResponse<Video[]>) => {
      if (res.data) {
        setVideos(res.data);
      }
    });
  }, []);

  return (
    <Router>
      <div className="app-root">
        <div className="container">
          <Switch>
            <Route path="/watch/:videoId">
              <VideoPlayer />
            </Route>
            <Route path="/">
              {videos.length ? (
                <Fragment>
                  <h1>Available Videos</h1>
                  <ul>
                    {videos?.map((video) => (
                      <li key={video.id}>
                        <Link to={`/watch/${video.id}`}>{video.title}</Link>
                      </li>
                    ))}
                  </ul>
                </Fragment>
              ) : (
                <h1>
                  No videos have been uploaded. Please use the upload script to upload a
                  video. Then, refresh the page.
                </h1>
              )}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
