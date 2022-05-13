import React, { useEffect, useState, FC } from "react";
import { BLOG } from "../../types/type";
import { GetServerSideProps, GetStaticProps } from "next";
import { getAllBlogsData } from "../../lib/fetch";
import { useRouter } from "next/router";
import Pagination from "../../components/Pagination";
import BlogList from "../../components/Blog/BlogList";
import SideBar from "../../components/Layout/SideBar";
import axios from "axios";

interface STATICPROPS {
  blogs: BLOG[];
}

/**
 * ブログ記事一覧画面
 * @param param0
 * @returns ブログ記事一覧画面
 */
const Blog: FC<STATICPROPS> = ({ blogs }) => {
  //現在のページ
  const [pageIndex, setPageIndex] = useState(1);
  //ルーターリンク
  const router = useRouter();
  //ブログの件数
  const totalCount: number = blogs.length;
  //１ページあたりの表示件数
  const perPage = 4;

  //検索ワード(コンテント)
  const [keyWord, setKeyWord] = useState("");
  //検索ワード(カテゴリー)
  const [keyCategory, setKeyCategory] = useState("");
  //検索結果のメッセージ
  const [msg, setMsg] = useState("");
  //表示データ
  const [blogData, setBlogData] = useState<BLOG[]>([]);
  //表示データ更新
  useEffect(() => {
    setBlogData(blogs);
  }, []);

  //検索機能（コンテント）
  const clickSearch = async (value: string) => {
    const res = await axios.post(
      "https://redux-blog-api.herokuapp.com/blogs/search/content",
      {
        content: value,
      }
    );
    if (res.data) {
      setBlogData(res.data);
      setMsg("");
      setKeyWord("");
    }
    if (res.data.length === 0) {
      setMsg("検索にヒットするブログがありません");
      setKeyWord("");
    }
  };

  //検索機能（カテゴリー）
  const categorySearch = async (value: string) => {
    const res = await axios.post(
      "https://redux-blog-api.herokuapp.com/blogs/search/category",
      {
        category: value,
      }
    );
    if (res.data) {
      setBlogData(res.data);
      setMsg("");
      setKeyWord("");
    }
  };

  //検索入力フォーム内容反映
  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setKeyWord(e.target.value);
  };

  return (
    <div>
      <div className="flex my-10">
        <div className="w-8/12 ml-20">
          <div className="flex">
            <label htmlFor="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => clickSearch(keyWord)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </label>
            <input
              type="text"
              placeholder="ブログ検索"
              className="mr-8 shadow-md"
              value={keyWord}
              onChange={handleChange}
            />
          </div>
          <BlogList
            blogs={blogData}
            pageIndex={pageIndex}
            perPage={perPage}
            categorySearch={categorySearch}
          />

          {msg !== "" && <div className="m-5">{msg}</div>}

          <div className="flex justify-center">
            <Pagination
              pageIndex={pageIndex}
              setPageIndex={setPageIndex}
              totalCount={totalCount}
              perPage={perPage}
            />
          </div>
        </div>
        <div className="w-4/12 mr-20">
          <SideBar blogs={blogData} title={"ブログ"} />
          <div className="flex justify-center">
            <button
              className="mt-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                router.push("/blog/add");
              }}
            >
              ブログを投稿する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

//SSGの場合
// export const getStaticProps: GetStaticProps = async () => {
//   const blogs = await getAllBlogsData();
//   return {
//     props: { blogs },
//     revalidate: 3,
//   };
// };

//SSRの場合（本来はSSGで表示、現状は投稿した記事をすぐに反映させたいためSSRで表示）
export const getServerSideProps: GetServerSideProps = async () => {
  const blogs = await getAllBlogsData();
  return {
    props: { blogs },
  };
};
