/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { useAppDispatch } from "../../ducks/app/hooks";
import { useRouter } from "next/router";
import { BLOG } from "../../types/type";
import { fetchAsyncDeleteBlog } from "../../ducks/features/blog/blogSlice";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllBlogsIds, getBlogData } from "../../lib/fetch";
import { returnCodeToBr } from "../../util/methods";

const BlogDetail: FC<BLOG> = ({
  _id,
  userName,
  title,
  content,
  category,
  imagePass,
}) => {
  // //ディスパッチメソッドを呼べるように
  const dispatch = useAppDispatch();
  const router = useRouter();

  const goOnEdit = (_id: string) => {
    router.push(`/blog/edit/${_id}`);
  };

  const deleteMethod = (_id: string) => {
    dispatch(fetchAsyncDeleteBlog(_id));
    router.push(`/blog/`);
  };

  return (
    <div className="p-5 mt-10 mx-20">
      <div>
        <div className="mb-5 text-2xl font-bold border-b-4 border-gray-400">
          ブログの詳細
        </div>
        <div className="w-11/12">
          <div className="flex mt-4">
            <div className="flex mx-4 w-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              {category &&
                category.map((category, index) => (
                  <span className="ml-2 p-1 rounded-md bg-red-200" key={index}>
                    {category}
                  </span>
                ))}
            </div>
          </div>
          <div className="my-4 py-3 flex justify-center">
            <img alt={"image"} src={imagePass} width={735} height={400} />
          </div>
          <div className="text-xl font-bold border-b-4 border-yellow-400 border-double">
            タイトル：{title}
          </div>
          <div className="flex mt-4">
            <div className="ml-8">
              <div className="w-100">ユーザー名：{userName}</div>

              <div className="w-100 mt-3 p-3 bg-yellow-50">
                {/* {returnCodeToBr(content)} */}
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            goOnEdit(_id);
          }}
        >
          編集する
        </button>
        <button
          className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            deleteMethod(_id);
          }}
        >
          削除する
        </button>
      </div>
    </div>
  );
};

export default BlogDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllBlogsIds();
  return {
    paths,
    fallback: true, //ブログを追加した場合に動的に増えるように
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const blog = await getBlogData(ctx.params?.id as string);
  return {
    props: {
      ...blog,
    },
    revalidate: 3,
  };
};
