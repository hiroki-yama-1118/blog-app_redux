/* eslint-disable @next/next/no-html-link-for-pages */
import React, { FC, memo } from "react";

/**
 * ヘッダー
 */
const Header: FC = memo(function Header() {
  console.log("Header");

  return (
    <div className="flex items-center justify-between flex-wrap bg-gray-100 p-6">
      <div className="flex items-center flex-no-shrink mr-12">
        <a href="/blog" className="font-semibold text-xl tracking-tigh">
          Blog site
        </a>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="/blog"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-500 mr-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Blog
          </a>
          <a
            href="/book"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-500 mr-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Book
          </a>
          <a
            href="/news"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-gray-500 mr-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            News
          </a>
        </div>
      </div>
    </div>
  );
});

export default Header;
