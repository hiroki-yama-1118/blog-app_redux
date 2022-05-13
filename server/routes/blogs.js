const router = require("express").Router();
let Blog = require("../models/blog.model");

//ブログデータ全件取得
router.route("/").get((req, res) => {
  Blog.find()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.status(400).json("Error:" + err));
});

//ブログ追加
router.route("/add").post((req, res) => {
  const userName = req.body.userName;
  const title = req.body.title;
  const date = Date.parse(req.body.date);
  const content = req.body.content;
  const introductory = req.body.introductory;
  const category = req.body.category;
  const imagePass = req.body.imagePass;

  const newBlog = new Blog({
    userName,
    title,
    date,
    content,
    introductory,
    category,
    imagePass,
  });
  newBlog
    .save()
    .then(() => res.json("Blog added"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//ブログ１件表示
router.route("/:id").get((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json("Error:" + err));
  return;
});

//ブログ１件削除
router.route("/:id").delete((req, res) => {
  Blog.findById(req.params.id)
    .deleteOne()
    .then(() => res.json("Blog deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//ブログ情報更新
router.route("/update/:id").put((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      blog.userName = req.body.userName;
      blog.title = req.body.title;
      blog.date = req.body.date;
      blog.content = req.body.content;
      blog.category = req.body.category;
      blog.introductory = req.body.introductory;

      blog
        .save()
        .then(() => res.json("Blog updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

//ブログ検索機能（タイトル）
router.route("/search/title").post((req, res) => {
  Blog.find({ title: { $regex: req.body.title, $options: "i" } })
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json("Error:" + err));
});

//ブログ検索機能（カテゴリー）
router.route("/search/category").post((req, res) => {
  Blog.find({ category: { $regex: req.body.category, $options: "i" } })
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json("Error:" + err));
});

//ブログ検索機能（コンテント）
router.route("/search/content").post((req, res) => {
  Blog.find({ content: { $regex: req.body.content, $options: "i" } })
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
