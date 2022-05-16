import fetch from "node-fetch";

const uri = "https://redux-blog-api-v2.herokuapp.com";

//全てのブログデータ取得
export const getAllBlogsData = async () => {
  const data = await fetch(`${uri}/blogs/`);
  const blogs = await data.json();
  if (!blogs) {
    return [];
  }
  return blogs;
};

//ブログID取得
export const getAllBlogsIds = async () => {
  const res = await fetch(`${uri}/blogs/`);
  const blogs = (await res.json()) as Promise<{ _id: string }[]>;
  if (!blogs) {
    return [];
  }
  return (await blogs).map((blog: { _id: string }) => {
    return {
      params: {
        id: String(blog._id),
      },
    };
  });
};

//ブログの１件データ取得
export const getBlogData = async (id: string) => {
  const res = await fetch(`${uri}/blogs/${id}`);
  const blog: any = await res.json();
  if (!blog) {
    return [];
  }
  return blog;
};
