import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import BookList from "../../components/Book/BookList";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../ducks/app/hooks";
import {
  selectBooks,
  fetchAsyncGetBooks,
} from "../../ducks/features/book/bookSlice";
import { BOOK } from "../../types/type";
import Pagination from "../../components/Pagination";
import SideBar from "../../components/Layout/SideBar";

const Book: NextPage = () => {
  console.log("book:index");

  const books = useAppSelector(selectBooks);
  const dispatch = useAppDispatch();
  const router = useRouter();
  //現在のページ
  const [pageIndex, setPageIndex] = useState(1);
  const totalCount: number = books.length;
  //１ページあたりの表示件数
  const perPage = 4;

  useEffect(() => {
    const fetchGetBook = async () => {
      await dispatch(fetchAsyncGetBooks());
    };
    fetchGetBook();
  }, [dispatch]);

  // const formatReleaseAt = (date: any) => {
  //   const formatDate = format(new Date(date), "yyyy年MM月dd日");
  //   return formatDate;
  // };

  const goOnDetail = (data: BOOK) => {
    // dispatch(selectBook(data));
    router.push(`/book/${data._id}`);
  };

  return (
    <div>
      <div className="flex my-10">
        <div className="w-8/12 ml-20">
          <BookList
            books={books}
            goOnDetail={goOnDetail}
            router={router}
            pageIndex={pageIndex}
            perPage={perPage}
          />
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
          <SideBar books={books} title={"登録本"} />
          <div className="flex justify-center">
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mt-5 border border-gray-400 rounded shadow"
              onClick={() => {
                router.push("/book/add");
              }}
            >
              本を登録する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Book;
