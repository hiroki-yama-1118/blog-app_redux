import { Field } from "formik";
import React, { FC, memo } from "react";

export const categoryArry = [
  { id: 1, category: "HTML" },
  { id: 2, category: "CSS" },
  { id: 3, category: "TypeScript" },
  { id: 4, category: "React" },
  { id: 5, category: "Vue" },
  { id: 6, category: "Node.js" },
  { id: 7, category: "AWS" },
  { id: 8, category: "MongoDB" },
  { id: 9, category: "MySQL" },
  { id: 10, category: "Java" },
];

type Props = {
  errors: any;
  touched: any;
  label: string;
  inputName: string;
  type: string;
};

/**
 * チェックボックスコンポーネント
 */
export const CheckBox: FC<Props> = memo(function CheckBox(props) {
  const { errors, touched, label, inputName, type } = props;
  console.log("CheckBox");

  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <div className="block">
          <div className="flex">
            <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {label}：
            </span>
            {{ errors } && { touched } ? (
              <div className="text-red-500 text-sm">{errors}</div>
            ) : null}
          </div>
          <div className="mt-2">
            {categoryArry.map((data) => (
              <span key={data.id} className="mr-4">
                <label className="inline-flex items-center">
                  <Field
                    type={type}
                    name={inputName}
                    value={data.category}
                    className="form-checkbox"
                  />
                  <span className="ml-2 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                    {data.category}
                  </span>
                </label>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
