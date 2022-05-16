/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Formik, Form, Field } from "formik";
import React, { FC, useState } from "react";
import CheckBox from "../../components/Form/CheckBox";
import InputLg from "../../components/Form/InputLg";
import InputSm from "../../components/Form/InputSm";
import TextArea from "../../components/Form/TextArea";
import { useAppDispatch } from "../../ducks/app/hooks";
import {
  addBlog,
  fetchAsyncAddBlog,
} from "../../ducks/features/blog/blogSlice";
import { BLOG } from "../../types/type";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Image from "next/image";

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
  imagePass: Yup.string().required("サムネイル画像を挿入してください"),
  category: Yup.array()
    .min(1, "1つ以上は選択してください")
    .max(3, "3つ以内で選択してください"),
});

const Add: FC = () => {
  //画像保存用画像パス
  const [photo, setPhoto] = useState();
  //画面表示用画像パス
  const [img, setImg] = useState<string>();
  //画面表示切り替え
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  const initialValues: BLOG = {
    _id: "",
    userName: "",
    title: "",
    date: "",
    content: "",
    introductory: "",
    category: [],
    imagePass: img as string,
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  //画像を選択
  const selectPhoto = async (e: any) => {
    setPhoto(e.target.files[0]);
  };
  //画像をアップロード
  const uploadPhoto = async () => {
    if (photo) {
      const url = await fetch(
        "https://redux-blog-api.herokuapp.com/s3url/"
      ).then((res) => res.json());
      const imgUrl = url.url;

      await fetch(imgUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: photo,
      });
      const imageUrl = imgUrl.split("?")[0];
      setImg(imageUrl);
      setIsDisplay(true);
    } else {
      alert("サムネイル画像を選択してください");
    }
  };

  const createdClicked = (values: BLOG) => {
    dispatch(fetchAsyncAddBlog(values));
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
      <div className="w-full w-3/5 p-10 my-10 bg-gray-50 shadow">
        <div className="mb-5 mr-6 text-2xl font-bold border-b-2 border-gray-400">
          ブログの投稿
        </div>

        <div className="flex flex-wrap mx-3 mb-6">
          {isDisplay === false && (
            <div className="w-full px-3">
              <div className="mb-5">
                サムネイル画像をアップロードしてください
              </div>
              <div className="flex">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor={"imagePass"}
                >
                  画像：
                </label>
              </div>
              <div className="flex">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  // id={"imagePass"}
                  type={"file"}
                  // name={"imagePass"}
                  onChange={selectPhoto}
                />
                <button
                  onClick={uploadPhoto}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 mb-3 border border-gray-400 rounded shadow"
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
        {img && (
          <div className="mb-10 flex justify-center">
            <img src={img} width={400} height={"auto"} />
          </div>
        )}

        {isDisplay && (
          <Formik
            initialValues={initialValues}
            validationSchema={AddBlogSchema}
            onSubmit={(values, actions) => {
              createdClicked(values);
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
                      登録する
                    </button>
                  </div>
                  {/* <div className="px-3">
                    <button
                      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      onClick={handleReset}
                    >
                      クリア
                    </button>
                  </div> */}
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Add;
