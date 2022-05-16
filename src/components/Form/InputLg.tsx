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
 * インプットフォームL
 */
export const InputLg: FC<Props> = memo(function InputLg(props) {
  const { errors, touched, label, id, inputName, placeholder, type } = props;
  console.log("InputLg");

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
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
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={id}
          type={type}
          name={inputName}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
});
