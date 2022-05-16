import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import BookList from "../../components/Book/BookList";
import { useAppSelector } from "../../ducks/app/hooks";
import { BOOK } from "../../types/type";
import { selectBooks } from "../../ducks/features/book/bookSlice";

const Search: NextPage = () => {
  console.log("book:search");

  const router = useRouter();
  const books = useAppSelector(selectBooks);

  const goOnDetail = (data: BOOK) => {
    router.push(`/book/${data._id}`);
  };
  return (
    <div>
      <BookList
        books={books}
        goOnDetail={goOnDetail}
        router={router}
        pageIndex={0}
        perPage={0}
      />
    </div>
  );
};

export default Search;
