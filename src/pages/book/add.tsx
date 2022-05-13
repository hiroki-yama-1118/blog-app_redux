import React, { FC } from "react";
import * as Yup from "yup";
import { BOOK } from "../../types/type";
import { useAppDispatch } from "../../ducks/app/hooks";
import {
  addBook,
  fetchAsyncAddBook,
} from "../../ducks/features/book/bookSlice";
import BookAddInput from "../../components/Book/BookAddInput";
import { useRouter } from "next/router";

export const AddBookSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "50文字以内で入力してください")
    .required("タイトルを入力してください")
    .trim("タイトルを入力してください"),
  author: Yup.string()
    .max(50, "50文字以内で入力してください")
    .required("著者名を入力してください")
    .trim("著者名を入力してください"),
  thoughts: Yup.string()
    .min(5, "5文字以上は入力してください")
    .max(200, "200文字以内で入力してください")
    .required("入力してください")
    .trim("入力してください"),
  category: Yup.array().min(1, "1つ以上は選択してください"),
  // imagePass: Yup.string().required("商品画像を挿入してください"),
  // releaseAt: Yup.string().required("発売日を選択してください"),
  link: Yup.string()
    .required("リンクを入力してください")
    .trim("リンクを入力してください"),
});

const Add: FC = () => {
  const initialValues: BOOK = {
    _id: "",
    title: "",
    category: [],
    imagePass: "",
    author: "",
    // releaseAt: "",
    thoughts: "",
    link: "",
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  const createdClicked = (values: BOOK) => {
    dispatch(fetchAsyncAddBook(values));
    dispatch(
      addBook({
        _id: "",
        title: "",
        category: [],
        imagePass: "",
        author: "",
        // releaseAt: "",
        thoughts: "",
        link: "",
      })
    );
    router.push(`/book/`);
  };

  return (
    <BookAddInput
      initialValues={initialValues}
      schema={AddBookSchema}
      createdClicked={createdClicked}
    />
  );
};

export default Add;
