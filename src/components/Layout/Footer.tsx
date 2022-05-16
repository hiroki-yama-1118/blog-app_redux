import React, { FC, memo } from "react";

/**
 * フッター
 */
const Footer: FC = memo(function Footer() {
  console.log("Footer");

  return (
    <div className="flex items-center justify-center bg-gray-100 font-bold p-4">
      Thank you ...
    </div>
  );
});

export default Footer;
