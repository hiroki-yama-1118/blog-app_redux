import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { BOOK } from "../../../types/type";
import { useAppDispatch } from "../../../ducks/app/hooks";
import {
  addBook,
  fetchAsyncUpdateBook,
} from "../../../ducks/features/book/bookSlice";
import { useRouter } from "next/router";
import axios from "axios";
import { Form, Formik } from "formik";
import InputLg from "../../../components/Form/InputLg";
import CheckBox from "../../../components/Form/CheckBox";
import InputSm from "../../../components/Form/InputSm";
import TextArea from "../../../components/Form/TextArea";

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
  category: Yup.array()
    .min(1, "1つ以上は選択してください")
    .max(3, "3つ以内で選択してください"),
  // imagePass: Yup.string().required("商品画像を挿入してください"),
  // releaseAt: Yup.string().required("発売日を選択してください"),
  link: Yup.string()
    .required("リンクを入力してください")
    .trim("リンクを入力してください"),
});

const Add: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [bookData, setBookData] = useState<BOOK>();

  const bookId = router.query.id;

  useEffect(() => {
    const fetchGetBook = async () => {
      const res = await axios.get(`http://localhost:8000/books/${bookId}`);
      if (res.status !== 200) {
        alert(Error);
      }
      setBookData(res.data);
    };
    if (bookId) {
      fetchGetBook();
    }
  }, [bookId]);

  const initialValues: BOOK = {
    _id: bookData?._id as string,
    title: bookData?.title as string,
    // category: selectedBook.category,
    category: bookData?.category as string[],
    imagePass: bookData?.imagePass as string,
    // imagePass: "",
    author: bookData?.author as string,
    // releaseAt: format(new Date(bookData?.releaseAt), "yyyy-MM-dd"),
    // releaseAt: bookData?.releaseAt,
    thoughts: bookData?.thoughts as string,
    link: bookData?.link as string,
  };

  const updatedClicked = (values: BOOK) => {
    dispatch(fetchAsyncUpdateBook(values));
    dispatch(
      addBook({
        _id: "",
        title: "",
        category: [],
        imagePass: "",
        author: "",
        releaseAt: "",
        thoughts: "",
        link: "",
      })
    );
    router.push(`/book/`);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full w-3/5 my-10 p-10 bg-gray-50 shadow">
        <div className="mb-10 mr-6 text-2xl font-bold border-b-2 border-gray-400">
          本の更新
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={AddBookSchema}
          onSubmit={(values, actions) => {
            updatedClicked(values);
            console.log(values);
            actions.setSubmitting(false);
            actions.resetForm();
          }}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ errors, touched, handleReset, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputLg
                errors={errors.title}
                touched={touched.title}
                id={"title"}
                label={"タイトル"}
                placeholder={"タイトル"}
                inputName={"title"}
                type={"text"}
              />
              <div className="flex flex-wrap -mx-3 mb-6">
                <InputSm
                  errors={errors.author}
                  touched={touched.author}
                  label={"著者名"}
                  id={"author"}
                  inputName={"author"}
                  type={"text"}
                  placeholder={"著者名"}
                />
                {/* <InputSm
                  errors={errors.releaseAt}
                  touched={touched.releaseAt}
                  label={"発売日"}
                  id={"releaseAt"}
                  inputName={"releaseAt"}
                  type={"date"}
                  placeholder={"発売日"}
                /> */}
              </div>
              <CheckBox
                errors={errors.category}
                touched={touched.category}
                label={"カテゴリー"}
                inputName={"category"}
                type={"checkbox"}
              />
              <TextArea
                errors={errors.thoughts}
                touched={touched.thoughts}
                label={"感想"}
                id={"thoughts"}
                inputName={"thoughts"}
                placeholder={"感想"}
                component={"textarea"}
                cols={30}
                rows={5}
              />
              <InputLg
                errors={errors.link}
                touched={touched.link}
                id={"link"}
                placeholder={"リンク"}
                label={"購入リンク先"}
                inputName={"link"}
                type={"text"}
              />
              {/* <InputLg
                errors={errors.imagePass}
                touched={touched.imagePass}
                id={"imagePass"}
                label={"画像"}
                inputName={"imagePass"}
                type={"file"}
              /> */}
              <div className="flex justify-center">
                <div className="px-3">
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    type="submit"
                  >
                    更新する
                  </button>
                </div>
                <div className="px-3">
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={handleReset}
                  >
                    クリア
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Add;
