/* eslint-disable @next/next/no-img-element */
import React, { FC, memo } from "react";
import { selectLoading } from "../../ducks/features/book/bookSlice";
import { NextRouter } from "next/router";
import { BOOK } from "../../types/type";
import { useSelector } from "react-redux";

type Props = {
  books: BOOK[];
  goOnDetail: (data: BOOK) => void;
  router: NextRouter;
  pageIndex: number;
  perPage: number;
};

/**
 * 本リスト
 */
const BookList: FC<Props> = memo(function BookList(props) {
  const { books, goOnDetail, pageIndex, perPage } = props;
  console.log("BookList");

  const loading = useSelector(selectLoading);

  return (
    <div>
      <div>
        <div className="mb-10 mr-6 text-2xl font-bold border-b-4 border-gray-400">
          読んだ本
        </div>
        {loading && <div>Loading</div>}
        {books &&
          books
            .slice(pageIndex * perPage - perPage, pageIndex * perPage)
            .map((data, index) => (
              <div key={index} className="w-11/12 my-10">
                <div
                  className="text-xl font-bold border-b-4 border-yellow-400 border-double cursor-pointer"
                  onClick={() => {
                    goOnDetail(data);
                    // openModal(data);
                  }}
                >
                  {data.title}
                </div>
                <div className="flex mt-4">
                  <div className="m-4 px-2 pt-2 pb-1 rounded-sm bg-gray-100 cursor-pointer">
                    <img
                      alt={"image"}
                      src={data.imagePass}
                      width={120}
                      height={"auto"}
                      className="h-40 w-28 shadow"
                      onClick={() => {
                        goOnDetail(data);
                      }}
                    />
                  </div>
                  <div className="ml-8 w-4/5">
                    <div className="w-4/5">著者名：{data.author}</div>

                    <div className="w-4/5 mt-3 p-3 bg-yellow-50">
                      {data.thoughts}
                    </div>
                    <div className="w-4/5 mt-5 text-blue-500 underline">
                      {data.link ? (
                        <a href={data.link}>{data.title}のリンク先はこちら</a>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
});
export default BookList;
