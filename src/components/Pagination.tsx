import React, { Dispatch, SetStateAction, useState, FC } from "react";

type Props = {
  totalCount: number; // リストの件数
  perPage: number; // 1ページあたりの件数
  pageIndex: number; // 現在のページ
  setPageIndex: Dispatch<SetStateAction<number>>; // 現在のページの更新関数
};

const Pagination: FC<Props> = (props) => {
  const { pageIndex, setPageIndex, totalCount, perPage } = props;
  console.log("Pagination");

  const range = () => {
    let pageArray: Array<number> = [];
    const pageContentNum = Math.ceil(totalCount / perPage);

    for (let i = 0; i < pageContentNum; i++) {
      pageArray = [...pageArray, i];
    }
    return pageArray;
  };

  return (
    <div>
      <div>
        {range().map((number, index) => (
          <a
            href="#"
            key={index}
            className={`${
              number + 1 === pageIndex &&
              "border-blue-500 text-blue-500 bg-blue-50 font-bold hover:bg-bgc z-10 pointer-events-none shadow-lg"
            } mr-4 border-gray-400 relative inline-flex items-center px-4 py-2 border text-sm hover:bg-gray-50`}
            onClick={() => setPageIndex(number + 1)}
          >
            {number + 1}
          </a>
        ))}
      </div>
      <div className="mt-2 text-right">全{totalCount}件</div>
    </div>
  );
};

export default Pagination;
