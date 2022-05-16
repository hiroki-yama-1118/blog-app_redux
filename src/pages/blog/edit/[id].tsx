import React, { FC } from "react";
import * as Yup from "yup";
import { BLOG } from "../../../types/type";
import { useAppDispatch } from "../../../ducks/app/hooks";

import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllBlogsIds, getBlogData } from "../../../lib/fetch";
import {
  addBlog,
  fetchAsyncUpdateBlog,
} from "../../../ducks/features/blog/blogSlice";
import { format } from "date-fns";
import { CheckBox } from "../../../components/Form/CheckBox";
import { InputLg } from "../../../components/Form/InputLg";
import { InputSm } from "../../../components/Form/InputSm";
import { TextArea } from "../../../components/Form/TextArea";

const AddBlogSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "50文字以内で入力してください")
    .required("タイトルを入力してください")
    .trim("タイトルを入力してください"),
  userName: Yup.string()
    .max(50, "50文字以内で入力してください")
    .required("ユーザー名を入力してください")
    .trim("ユーザー名を入力してください"),
  date: Yup.string().required("投稿日を選択してください"),
  introductory: Yup.string()
    .min(5, "5文字以上は入力してください")
    .max(200, "200文字以内で入力してください")
    .required("導入文を入力してください")
    .trim("導入文を入力してください"),
  content: Yup.string()
    .min(5, "5文字以上は入力してください")
    .required("入力してください")
    .trim("入力してください"),
  // imagePass: Yup.string().required("サムネイル画像を挿入してください"),
  category: Yup.array()
    .min(1, "1つ以上は選択してください")
    .max(3, "3つ以内で選択してください"),
});

const EditBlog: FC<BLOG> = ({
  _id,
  userName,
  title,
  date,
  content,
  introductory,
  category,
  imagePass,
}) => {
  const initialValues: BLOG = {
    _id,
    userName,
    title,
    date: format(new Date(date), "yyyy-MM-dd"),
    content,
    introductory,
    category,
    imagePass,
  };
  console.log("Edit:id");
  

  const dispatch = useAppDispatch();
  const router = useRouter();

  const updatedClicked = async (values: BLOG) => {
    dispatch(fetchAsyncUpdateBlog(values));
    dispatch(
      addBlog({
        _id: "",
        userName: "",
        title: "",
        date: "",
        content: "",
        introductory: "",
        category: [],
        imagePass: "",
      })
    );
    router.push(`/blog/`);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full my-10 w-3/5 p-10 bg-gray-50 shadow">
        <div className="mb-10 mr-6 text-2xl font-bold border-b-2 border-gray-400">
          ブログの編集
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={AddBlogSchema}
          onSubmit={(values, actions) => {
            updatedClicked(values);

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
                label={"タイトル"}
                id={"title"}
                inputName={"title"}
                placeholder={"ブログのタイトル"}
                type={"text"}
              />
              <div className="flex flex-wrap -mx-3 mb-6">
                <InputSm
                  errors={errors.userName}
                  touched={touched.userName}
                  label={"ユーザー名"}
                  id={"userName"}
                  inputName={"userName"}
                  type={"text"}
                  placeholder={"ユーザー名"}
                />
                <InputSm
                  errors={errors.date}
                  touched={touched.date}
                  label={"投稿日時"}
                  id={"date"}
                  inputName={"date"}
                  type={"date"}
                  placeholder={"投稿日時"}
                />
              </div>
              <CheckBox
                errors={errors.category}
                touched={touched.category}
                label={"カテゴリー"}
                inputName={"category"}
                type={"checkbox"}
              />
              <TextArea
                errors={errors.introductory}
                touched={touched.introductory}
                label={"導入文"}
                id={"introductory"}
                inputName={"introductory"}
                placeholder={"導入文"}
                component={"textarea"}
                cols={30}
                rows={5}
              />
              <TextArea
                errors={errors.content}
                touched={touched.content}
                label={"内容"}
                id={"content"}
                inputName={"content"}
                placeholder={"内容"}
                component={"textarea"}
                cols={30}
                rows={5}
              />
              <InputLg
                errors={errors.imagePass}
                touched={touched.imagePass}
                label={"画像"}
                id={"imagePass"}
                inputName={"imagePass"}
                type={"text"}
              />
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

export default EditBlog;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllBlogsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const blog = await getBlogData(ctx.params?.id as string);
  return {
    props: {
      ...blog,
    },
    revalidate: 3,
  };
};
