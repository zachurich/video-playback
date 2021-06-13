const apiBaseUrl = process.env.NODE_ENV !== "production" ? `http://localhost:8000/` : "/";

export const fetchVideos = () =>
  fetch(`${apiBaseUrl}api/videos`).then((res: Response) => res.json());

export const fetchVideo = (videoId: string) =>
  fetch(`${apiBaseUrl}api/videos/${videoId}`).then((res: Response) => res.json());
