import React, { FC } from "react";
import { Formik, Form, Field } from "formik";
import { BOOK } from "../../types/type";
import InputLg from "../Form/InputLg";
import InputSm from "../Form/InputSm";
import TextArea from "../Form/TextArea";
import CheckBox from "../Form/CheckBox";

type Props = {
  initialValues: BOOK;
  schema: any;
  createdClicked: (values: BOOK) => void;
};

const BookAddInput: FC<Props> = (props) => {
  const { initialValues, schema, createdClicked } = props;

  return (
    <div className="flex justify-center">
      <div className="w-full w-3/5 my-10 p-10 bg-gray-50 shadow">
        <div className="mb-10 mr-6 text-2xl font-bold border-b-2 border-gray-400">
          本の登録
        </div>
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
                label={"購入リンク先"}
                id={"link"}
                inputName={"link"}
                placeholder={"URL"}
                type={"text"}
              />
              {/* <InputLg
                errors={errors.imagePass}
                touched={touched.imagePass}
                label={"画像"}
                id={"imagePass"}
                inputName={"imagePass"}
                type={"file"}
              /> */}
              <div className="flex justify-center">
                <div className="px-3">
                  <button
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    type="submit"
                  >
                    登録する
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

export default BookAddInput;
