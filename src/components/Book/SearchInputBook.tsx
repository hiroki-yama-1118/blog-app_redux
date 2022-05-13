import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../ducks/app/hooks";
import {
  fetchAsyncSearchBook,
  selectBooks,
} from "../../ducks/features/book/bookSlice";

export const SearchInputBook = () => {
  const [keyWord, setKeyWord] = useState("");
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooks);
  const router = useRouter();

  const clickSearch = async (value: string) => {
    const fetchGetBook = async () => {
      await dispatch(fetchAsyncSearchBook(value));
    };
    fetchGetBook();
    router.push("/book/search");
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setKeyWord(e.target.value);
  };

  return (
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
        placeholder="キーワード検索"
        className="mr-8 shadow-md"
        value={keyWord}
        onChange={handleChange}
      />
    </div>
  );
};
