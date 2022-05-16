/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useState } from "react";
import { Formik, Form } from "formik";
import { BOOK } from "../../types/type";
import InputLg from "../Form/InputLg";
import InputSm from "../Form/InputSm";
import TextArea from "../Form/TextArea";
import CheckBox from "../Form/CheckBox";

type Props = {
  initialValues: BOOK;
  schema: any;
  createdClicked: (values: BOOK) => void;
  setImg: React.Dispatch<React.SetStateAction<string | undefined>>;
  img: string | undefined;
};

const BookAddInput: FC<Props> = (props) => {
  const { initialValues, schema, createdClicked, setImg, img } = props;

  //画像保存用画像パス
  const [photo, setPhoto] = useState();

  //画面表示切り替え
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  //画像を選択
  const selectPhoto = async (e: any) => {
    setPhoto(e.target.files[0]);
  };

  //画像をアップロード
  const uploadPhoto = async () => {
    if (photo) {
      const url = await fetch("https://redux-blog-api-v2.herokuapp.com/s3url", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => res.json());
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
      alert("登録本の画像を選択してください");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full w-3/5 my-10 p-10 bg-gray-50 shadow">
        <div className="mb-10 mr-6 text-2xl font-bold border-b-2 border-gray-400">
          本の登録
        </div>

        <div className="flex flex-wrap mx-3 mb-6">
          {isDisplay === false && (
            <div className="w-full px-3">
              <div className="mb-5">登録本の画像をアップロードしてください</div>
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
                  type={"file"}
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
            validationSchema={schema}
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
                  placeholder={"本のタイトル"}
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
                  label={"購入リンク先"}
                  id={"link"}
                  inputName={"link"}
                  placeholder={"URL"}
                  type={"text"}
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
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default BookAddInput;
