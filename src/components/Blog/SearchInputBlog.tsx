/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { format } from "date-fns";
import { BLOG } from "../../types/type";
import Image from "next/image";

const SearchInputBlog = () => {
  const [keyWord, setKeyWord] = useState("");
  const [blogs, setBlogs] = useState([]);

  const clickSearch = async (value: string) => {
    const res = await axios.post(
      "https://redux-blog-api.herokuapp.com/blogs/search/content",
      {
        content: value,
      }
    );
    setBlogs(res.data);
    setKeyWord("");
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setKeyWord(e.target.value);
  };

  return (
    <div>
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
      <div>
        {blogs &&
          blogs
            // .slice(pageIndex * perPage - perPage, pageIndex * perPage)
            .map((data: BLOG) => (
              <div key={data._id}>
                <div className="w-11/12 my-10">
                  <div className="text-xl font-bold border-b-4 border-blue-300 border-double">
                    <Link href={`/blog/${data._id}`}>
                      <a>{data.title}</a>
                    </Link>
                  </div>
                  <div className="flex mt-4">
                    <div className="flex w-100 mx-4">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {format(new Date(data.date), "yyyy年MM月dd日")}
                      </span>
                    </div>
                    <div className="flex w-100 mx-4">
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
                      <span>
                        {data.category.map((category, index) => (
                          <span
                            className="ml-2 p-1 rounded-md bg-red-200"
                            key={index}
                          >
                            {category}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="m-4 px-2 pt-2 pb-1 rounded-sm bg-gray-100">
                    <Link href={`/blog/${data._id}`}>
                      <a>
                        {/* {data.imagePass !== "" ? (
                      <Image
                        alt={"image"}
                        src={data.imagePass}
                        width={735}
                        height={300}
                        layout={"fixed"}
                      />
                    ) : ( */}
                        <img
                          alt={"image"}
                          src={"/img2.jpg"}
                          width={735}
                          height={300}
                          // layout={"responsive"}
                        />
                        {/* )} */}
                      </a>
                    </Link>
                  </div>
                  <div className="w-100 mt-3 p-3 bg-blue-50">
                    <div className="w-100">{data.introductory}</div>
                  </div>
                  <div className="w-100 mt-5 text-right text-blue-500 underline">
                    <Link href={`/blog/${data._id}`}>
                      <a>続きを読む ＞</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SearchInputBlog;
