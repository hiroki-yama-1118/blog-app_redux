import HTMLReactParser from "html-react-parser";

/**
 * テキストをHTMLに変換するメソッド.
 *
 * @remarks
 * 改行はbrタグに変換する。
 *
 * @param text - HTMLに変換するテキスト
 * @returns textが空文字列の場合は空文字列。そうでなければHTMLに変換した文字列。
 */
export const returnCodeToBr = (text: any) => {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, "<br />"));
  }
};
