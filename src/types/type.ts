//登録本のタイプ
export type BOOK = {
  _id: string;
  title: string;
  category: string[];
  imagePass: string;
  author: string;
  // releaseAt: any;
  thoughts: string;
  link: string;
};

//登録ブログのタイプ
export type BLOG = {
  _id: string;
  userName: string;
  title: string;
  date: string;
  content: string;
  introductory: string;
  category: string[];
  imagePass: string;
};

//ニュース記事のタイプ
export type NEWS = {
  author: string;
  description: string;
  publishedAt: any;
  title: string;
  url: string;
  urlToImage: string;
};
