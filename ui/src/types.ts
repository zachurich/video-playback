export interface Video {
  id: string;
  title: string;
}

export interface VideoResponse<Type> extends Response {
  data?: Type | null;
}
