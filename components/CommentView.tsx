import axios from "axios";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import useDetailPost from "../hooks/react-query/useDetailPost";
import useUser from "../hooks/react-query/useUser";
import commentApi from "../lib/api/comment";
import { queryKeys } from "../react-query/queryKeys";
import dateFormat from "../util/date";
import { isNotNil } from "../util/nil";

const CommentView = (props: { comment: any }) => {
  const queryClient = useQueryClient();

  const { userInfo } = useUser();
  const { post } = useDetailPost();

  // mutation
  // deleteComment
  const { mutate: deleteComment, isLoading: isDeleteLoading } = useMutation(
    (commentId: string) => commentApi.deleteComment({ commentId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.post], post.data.post.id);
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          // TODO :: 추후 에러 핸들링
          console.log(error);
        }
      },
    }
  );

  // function
  const onClickDeleteButton = useCallback(
    (commentId: string) => {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        deleteComment(commentId);
      }
    },
    [deleteComment]
  );

  return (
    <S.Container>
      <li>
        <div className="content-container">
          <span className="comment">{props.comment.comment}</span>
          <span className="comment-created-date">
            작성일 : {dateFormat(props.comment.created_at)}
          </span>
        </div>

        {isNotNil(userInfo) && userInfo.id === post.data.post.usersId && (
          <>
            <div className="button-container">
              <button>수정</button>
              <button onClick={() => onClickDeleteButton(props.comment.id)}>
                삭제
              </button>
            </div>
          </>
        )}
      </li>
    </S.Container>
  );
};

export default CommentView;

const S = {
  Container: styled.div`
    li {
      display: flex;
      flex-direction: column;
      width: 100%;
      border: 1px solid black;

      .content-container {
        display: flex;
        justify-content: space-between;
        .comment {
          white-space: break-spaces;
          margin: 8px 0 8px 8px;
        }

        .comment-created-date {
          margin: 8px 8px 8px 0;
        }
      }

      .button-container {
        display: flex;
        justify-content: flex-end;
      }
    }
  `,
};
