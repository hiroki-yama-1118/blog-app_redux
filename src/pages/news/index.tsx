/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { NEWS } from "../../types/type";

/**
 *ニュース記事一覧表示画面
 * @param props SSGで取得したニュース記事
 * @returns ニュース記事一覧表示画面
 */
const News = (props: { topArticles: NEWS[] }) => {
  const newsData = props.topArticles;
  console.log("news:index");

  return (
    <div>
      <div className="h-3/5 bg-white py-2 px-20 mt-10">
        <div className="mb-4 mx-2 text-xl text-center font-bold border-b-2 border-gray-400 border-dotted">
          最新ニュース
        </div>
        {newsData &&
          newsData.map((data, index) => (
            <Link href={data.url} key={index}>
              <a>
                <div className="flex my-10 mx-5 bg-gray-100 p-3 shadow rounded-sm">
                  <img
                    alt={"image"}
                    src={data.urlToImage}
                    width={"80"}
                    height={"auto"}
                  />
                  <div>
                    <div className="ml-5 font-bold">{data.title}</div>
                    <div className="ml-5 mt-3">
                      {format(new Date(data.publishedAt), "yyyy年MM月dd日")}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default News;

export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10; // 取得したい記事の数
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWSAPIKEY}`
  );
  const topJson = await topRes.json();
  const topArticles = topJson?.articles;

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  };
};
