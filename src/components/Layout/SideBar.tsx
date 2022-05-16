/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { getAllBlogsData } from "../../lib/fetch";
import { BLOG, BOOK } from "../../types/type";
import Image from "next/image";
import Link from "next/link";
import { categoryArry } from "../Form/CheckBox";

interface PROPS {
  blogs?: BLOG[];
  books?: BOOK[];
  title: string;
  categorySearch?: (value: string) => Promise<void>;
}

const SideBar: FC<PROPS> = (props) => {
  const { blogs, title, books, categorySearch } = props;

  return (
    <div className="h-auto bg-gray-100 p-4 rounded-md shadow">
      {/* <div className="h-2/6 bg-white pt-2">
        <div className="mb-4 mx-2 text-xl text-center font-bold border-b-2 border-gray-400 border-dotted">
          カテゴリー
        </div>
        <div className="ml-16">
          <ul className="flex flex-wrap list-disc text-gray-700">
            {blogs &&
              categoryArry.map((data) => (
                <li
                  key={data.id}
                  className="w-1/2 mb-2 cursor-pointer"
                  // onClick={() => categorySearch(data.category)}
                >
                  {data.category}
                </li>
              ))}
            {books &&
              categoryArry.map((data) => (
                <li key={data.id} className="w-1/2 mb-2 cursor-pointer">
                  {data.category}
                </li>
              ))}
          </ul>
        </div>
      </div> */}
      <div className="h-3/5 bg-white py-2 mt-10">
        <div className="mb-4 mx-2 text-xl text-center font-bold border-b-2 border-gray-400 border-dotted">
          最新の{title}
        </div>
        {blogs &&
          blogs
            .slice(-3)
            .reverse()
            .map((data, index) => (
              <Link href={`/blog/${data._id}`} key={index}>
                <a>
                  <div className="flex my-10 mx-5 bg-gray-100 p-3 shadow rounded-sm">
                    <img
                      alt={"image"}
                      src={data.imagePass}
                      width={120}
                      height={100}
                    />
                    <div>
                      <div className="ml-5 font-bold">{data.title}</div>
                      <div className="ml-5 mt-3">{data.introductory}</div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        {books &&
          books
            .slice(-3)
            .reverse()
            .map((data, index) => (
              // eslint-disable-next-line react/jsx-key
              <Link href={`/blog/${data._id}`} key={index}>
                <a>
                  <div className="flex my-10 mx-5 bg-gray-100 p-3 shadow rounded-sm">
                    <img
                      alt={"image"}
                      src={data.imagePass}
                      width={100}
                      height={"auto"}
                      className="shadow"
                    />
                    <div>
                      <div className="ml-5 font-bold">{data.title}</div>
                      <div className="ml-5 mt-3">{data.author}</div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default SideBar;
