export interface FetchPostReq {
  skip: number;
  take: number;
}

export interface SavePostReq {
  name: string;
  content: string;
}
