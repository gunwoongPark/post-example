export interface FetchPostReq {
  skip: number;
  take: number;
}

export interface SavePostReq {
  name: string;
  content: string;
}

export interface DeletePostReq {
  boardId: string;
}

export interface FetchDetailPostReq {
  boardId: string;
}

export interface ModifyPostReq {
  boardId: string;
}
