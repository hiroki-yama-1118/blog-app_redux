import fetch from "node-fetch";

const uri = "http://localhost:8000";

export const getAllBlogsData = async () => {
  const data = await fetch(`${uri}/blogs/`);
  const blogs = await data.json();
  return blogs;
};

export const getAllBlogsIds = async () => {
  const res = await fetch(`${uri}/blogs/`);
  const blogs = (await res.json()) as Promise<{ _id: string }[]>;
  return (await blogs).map((blog: { _id: string }) => {
    return {
      params: {
        id: String(blog._id),
      },
    };
  });
};

export const getBlogData = async (id: string) => {
  const res = await fetch(`${uri}/blogs/${id}`);
  const blog: any = await res.json();
  return blog;
};
