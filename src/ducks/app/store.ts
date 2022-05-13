import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypeOf } from "yup";
import bookReducer from "../features/book/bookSlice";
import blogReducer from "../features/blog/blogSlice";
import { save, load } from "redux-localstorage-simple";

export const store = configureStore({
  reducer: {
    book: bookReducer,
    blog: blogReducer,
  },
  // preloadedState: load(), //ローカルストレージのデータ取得
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(
  //     save({ states: ["book.selectedBook", "blog.selectedBlog"] })
  //   ), //ローカルストレージに保存用
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// export type AppStore=ReturnType<typeOf store>;
// export type AppState=ReturnType<AppStore["getState"]>
