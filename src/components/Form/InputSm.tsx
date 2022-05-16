import { Field } from "formik";
import React, { FC, memo } from "react";

type Props = {
  errors: any;
  touched: any;
  label: string;
  id: string;
  inputName: string;
  placeholder?: string;
  type: string;
};

/**
 * インプットフォームS
 */
export const InputSm: FC<Props> = memo(function InputSm(props) {
  const { errors, touched, label, id, inputName, placeholder, type } = props;
  console.log("InputSm");

  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <div className="flex">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={id}
        >
          {label}：
        </label>
        {{ errors } && { touched } ? (
          <div className="text-red-500 text-sm">{errors}</div>
        ) : null}
      </div>
      <Field
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id={id}
        type={type}
        placeholder={placeholder}
        name={inputName}
      />
    </div>
  );
});
