import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BLOG } from "../../../types/type";

const apiUrl = "https://redux-blog-api-v2.herokuapp.com";

//ブログ情報を取得
export const fetchAsyncGetBlogs = createAsyncThunk("blogs/get", async () => {
  const res = await axios.get(`${apiUrl}/blogs`);
  if (res.status !== 200) {
    alert(Error);
  }
  return { data: res.data, status: res.status };
});

//ブログ情報を一件取得
export const fetchAsyncGetBlogById = createAsyncThunk(
  "blog/get/byId",
  async (blogId: string) => {
    const res = await axios.get(`${apiUrl}/blogs/${blogId}`);
    if (res.status !== 200) {
      alert(Error);
    }
    return { data: res.data, status: res.status };
  }
);

//ブログ情報を追加
export const fetchAsyncAddBlog = createAsyncThunk(
  "blogs/add",
  async (blog: BLOG) => {
    const res = await axios.post(`${apiUrl}/blogs/add`, blog);
    if (res.status === 200) {
      alert("ブログを投稿しました");
    }
    if (res.status !== 200) {
      alert("ブログの投稿に失敗しました");
    }
    return { data: res.data, status: res.status };
  }
);

//ブログ情報編集
export const fetchAsyncUpdateBlog = createAsyncThunk(
  "blogs/put",
  async (blog: BLOG) => {
    const res = await axios.put(`${apiUrl}/blogs/update/${blog._id}`, blog);

    if (res.status === 200) {
      alert("ブログを編集しました");
    }
    if (res.status !== 200) {
      alert("ブログの編集に失敗しました");
    }

    return res.data;
  }
);

//ブログ情報削除
export const fetchAsyncDeleteBlog = createAsyncThunk(
  "blog/delete",
  async (id: string) => {
    const res = await axios.delete(`${apiUrl}/blogs/${id}`);
    if (res.status === 200) {
      alert("ブログを削除しました");
    }
    if (res.status !== 200) {
      alert("ブログの削除に失敗しました");
    }
    return id;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    //APIに登録されているデータの形
    //表示用データ
    blogs: [
      {
        _id: "",
        userName: "",
        title: "",
        date: "",
        content: "",
        introductory: "",
        category: [""],
        imagePass: "",
      },
    ],
    addedBlog: {
      _id: "",
      userName: "",
      title: "",
      date: "",
      content: "",
      introductory: "",
      category: [""],
      imagePass: "",
    },
    selectedBlog: {
      _id: "",
      userName: "",
      title: "",
      date: "",
      content: "",
      introductory: "",
      category: [""],
      imagePass: "",
    },
  },
  reducers: {
    addBlog(state, action) {
      state.addedBlog = action.payload;
    },
    selectBlog(state, action) {
      state.selectedBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    //表示が正常に終了した後にfetchでstate情報を格納
    builder.addCase(fetchAsyncGetBlogs.fulfilled, (state, action) => {
      return {
        ...state,
        blogs: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncGetBlogById.fulfilled, (state, action) => {
      return {
        ...state,
        blogs: action.payload.data,
      };
    });
    builder.addCase(fetchAsyncAddBlog.fulfilled, (state, action) => {
      return {
        ...state,
        blogs: [action.payload.data, ...state.blogs],
      };
    });
    builder.addCase(fetchAsyncUpdateBlog.fulfilled, (state, action) => {
      return {
        ...state,
        blogs: state.blogs.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
        selectedBlog: action.payload,
      };
    });
    builder.addCase(fetchAsyncDeleteBlog.fulfilled, (state, action) => {
      return {
        ...state,
        blogs: state.blogs.filter((t) => t._id !== action.payload),
        selectedBlog: {
          _id: "",
          userName: "",
          title: "",
          date: "",
          content: "",
          introductory: "",
          category: [""],
          imagePass: "",
        },
      };
    });
  },
});
export const { addBlog, selectBlog } = blogSlice.actions;

export const selectBlogs = (state: { blog: { blogs: BLOG[] } }) =>
  state.blog.blogs;
export const selectAddedBlog = (state: { blog: { addedBlog: BLOG } }) =>
  state.blog.addedBlog;
export const selectSelectedBlog = (state: { blog: { selectedBlog: BLOG } }) =>
  state.blog.selectedBlog;

export default blogSlice.reducer;
