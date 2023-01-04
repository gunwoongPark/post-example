import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import postApi from "../../../lib/api/post";
import { queryKeys } from "../../../react-query/queryKeys";

const PostDetailPage = () => {
  const router = useRouter();

  return <></>;
};

export default PostDetailPage;

type PostDetailParamsType = { postId: string };

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { postId } = context.params as PostDetailParamsType;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([queryKeys.post, postId], () =>
    postApi.fetchDetailPost({ boardId: postId })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await postApi.fetchPost({ skip: 0, take: 3 });

  const paths = res.data.map((post: any) => post.id);

  return {
    paths,
    fallback: true,
  };
};
