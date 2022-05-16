import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useRouter } from "next/router";
import { BOOK } from "../../../types/type";
import { save, load } from "redux-localstorage-simple";

const apiUrl = "https://redux-blog-api-v2.herokuapp.com";

//アクション名(books/get)
//本情報を取得
export const fetchAsyncGetBooks = createAsyncThunk("books/get", async () => {
  const res = await axios.get(`${apiUrl}/books`);
  if (res.status !== 200) {
    alert(Error);
  }
  return { data: res.data, status: res.status };
});

//本情報を一件取得
export const fetchAsyncGetBookById = createAsyncThunk(
  "book/get/byId",
  async (bookId: string) => {
    const res = await axios.get(`${apiUrl}/books/${bookId}`);
    if (res.status !== 200) {
      alert(Error);
    }
    return res.data;
  }
);

//本情報を追加
export const fetchAsyncAddBook = createAsyncThunk(
  "books/add",
  async (book: BOOK) => {
    const res = await axios.post(`${apiUrl}/books/add`, book);
    if (res.status === 200) {
      alert("本を追加しました");
    }
    if (res.status !== 200) {
      alert("本の追加に失敗しました");
    }
    return { data: res.data, status: res.status };
  }
);

//本情報編集
export const fetchAsyncUpdateBook = createAsyncThunk(
  "books/put",
  async (book: BOOK) => {
    const res = await axios.put(`${apiUrl}/books/update/${book._id}`, book);
    if (res.status === 200) {
      alert("本情報を編集しました");
    }
    if (res.status !== 200) {
      alert("本情報の編集に失敗しました");
    }

    return res.data;
  }
);

//本情報削除
export const fetchAsyncDeleteBook = createAsyncThunk(
  "book/delete",
  async (id: string) => {
    const res = await axios.delete(`${apiUrl}/books/${id}`);
    if (res.status === 200) {
      console.log("サーバー" + id);
      alert("本を削除しました");
    }
    if (res.status !== 200) {
      alert("本の削除に失敗しました");
    }
    return id;
  }
);

//本情報検索（タイトル）
export const fetchAsyncSearchBook = createAsyncThunk(
  "book/search",
  async (data: string) => {
    const res = await axios.post(`${apiUrl}/books/search/title`, {
      title: data,
    });
    console.dir("ううう" + JSON.stringify(res.data));

    if (res.status !== 200) {
      alert("本情報の検索に失敗しました");
    }
    return res.data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    isLoading: false,
    //APIに登録されているデータの形
    //表示用データ
    books: [
      {
        _id: "",
        title: "",
        category: [""],
        imagePass: "",
        author: "",
        releaseAt: "",
        thoughts: "",
        link: "",
      },
    ],
    addedBook: {
      _id: "",
      title: "",
      category: [""],
      imagePass: "",
      author: "",
      releaseAt: "",
      thoughts: "",
      link: "",
    },
    selectedBook: {
      _id: "",
      title: "",
      category: [""],
      imagePass: "",
      author: "",
      releaseAt: "",
      thoughts: "",
      link: "",
    },
  },
  reducers: {
    addBook(state, action) {
      state.addedBook = action.payload;
    },
    selectBook(state, action) {
      state.selectedBook = action.payload;
    },
    searchBook(state, action) {
      state.books = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    //表示が正常に終了した後にfetchでstate情報を格納
    builder.addCase(fetchAsyncGetBooks.fulfilled, (state, action) => {
      // state.isLoading = false;
      return {
        ...state,
        books: action.payload.data,
      };
    });

    builder.addCase(fetchAsyncGetBookById.fulfilled, (state, action) => {
      // state.isLoading = false;
      return {
        ...state,
        books: action.payload.data,
      };
    });

    builder.addCase(fetchAsyncAddBook.fulfilled, (state, action) => {
      // state.isLoading = false;
      return {
        ...state,
        books: [action.payload.data, ...state.books],
      };
    });

    builder.addCase(fetchAsyncUpdateBook.fulfilled, (state, action) => {
      // state.isLoading = false;
      return {
        ...state,
        blogs: state.books.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
        selectedBook: action.payload,
      };
    });

    builder.addCase(fetchAsyncDeleteBook.fulfilled, (state, action) => {
      // state.isLoading = false;
      return {
        ...state,
        blogs: state.books.filter((t) => t._id !== action.payload),
        selectedBook: {
          _id: "",
          title: "",
          category: [""],
          imagePass: "",
          author: "",
          releaseAt: "",
          thoughts: "",
          link: "",
        },
      };
    });

    builder.addCase(fetchAsyncSearchBook.fulfilled, (state, action) => {
      // state.isLoading = false;
      return {
        ...state,
        books: action.payload.data,
      };
    });
  },
});

export const { addBook, selectBook, searchBook } = bookSlice.actions;

export const selectBooks = (state: {
  book: {
    books: BOOK[];
  };
}) => state.book.books;

export const selectAddedBook = (state: { book: { addedBook: BOOK } }) =>
  state.book.addedBook;

export const selectSelectedBook = (state: { book: { selectedBook: BOOK } }) =>
  state.book.selectedBook;

export const selectLoading = (state: any) => state.book.isLoding;

export default bookSlice.reducer;
