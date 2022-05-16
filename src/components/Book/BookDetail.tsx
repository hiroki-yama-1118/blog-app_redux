/* eslint-disable @next/next/no-img-element */
import React, { useEffect, FC, useState } from "react";
import { useAppDispatch } from "../../ducks/app/hooks";
import {
  fetchAsyncDeleteBook,
  selectBook,
} from "../../ducks/features/book/bookSlice";
import { useRouter } from "next/router";
import { BOOK } from "../../types/type";
import axios from "axios";

const BookDetail: FC = () => {
  console.log("BookDetail");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [bookData, setBookData] = useState<BOOK>();

  const bookId = router.query.id;

  useEffect(() => {
    const fetchGetBook = async () => {
      const res = await axios.get(
        `https://redux-blog-api-v2.herokuapp.com/books/${bookId}`
      );
      if (res.status !== 200) {
        alert(Error);
      }
      setBookData(res.data);
    };
    if (bookId) {
      fetchGetBook();
    }
  }, [bookId]);

  const goOnEdit = (data: any) => {
    dispatch(selectBook(data));
    router.push(`/book/edit/${data._id}`);
  };

  const deleteMethod = (data: any) => {
    dispatch(fetchAsyncDeleteBook(data._id));
    router.push(`/book/`);
  };

  return (
    <div className="p-5 mx-20">
      <div>
        <div
          className="text-xl mb-5 cursor-pointer"
          onClick={() => router.back()}
        >
          ⇦戻る
        </div>
        <div className="mb-10 mr-6 text-2xl font-bold border-b-4 border-gray-400">
          本の詳細
        </div>
        <div className="w-11/12 my-10">
          <div className="my-4 py-3 flex justify-center">
            <div className="w-2/4 ">
              <img
                alt={"image"}
                src={bookData?.imagePass}
                width={300}
                height={500}
                className="w-9/12"
              />
            </div>

            <div className="w-11/12">
              <div className="text-xl font-bold border-b-4 border-yellow-400 border-double">
                タイトル：{bookData?.title}
              </div>
              <div className="flex mt-4">
                <div className="ml-8">
                  <div className="w-100 mt-3">著者名：{bookData?.author}</div>
                  <div className="w-100 mt-5">
                    カテゴリー：
                    {bookData?.category.map((category, index) => (
                      <span
                        className="ml-2 p-1 mt-5 rounded-md bg-red-200"
                        key={index}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="w-100 mt-8 p-3 bg-yellow-50">
                    {/* {returnCodeToBr(bookData?.thoughts)} */}
                    {bookData?.thoughts}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            goOnEdit(bookData);
          }}
        >
          編集する
        </button>
        <button
          className="mx-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            deleteMethod(bookData);
          }}
        >
          削除する
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
