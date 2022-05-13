const router = require("express").Router();
let Book = require("../models/book.model");

//本データ全件取得
router.route("/").get((req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json("Error:" + err));
});

//本追加
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const category = req.body.category;
  const imagePass = req.body.imagePass;
  const author = req.body.author;
  const releaseAt = Date(req.body.releaseAt);
  const thoughts = req.body.thoughts;
  const link = req.body.link;

  const newBook = new Book({
    title,
    category,
    imagePass,
    author,
    releaseAt,
    thoughts,
    link,
  });
  newBook
    .save()
    .then(() => res.json("Book added"))
    .catch((err) => res.status(400).json("Error:" + err));
});

//本１件表示
router.route("/:id").get((req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json("Error:" + err));
  return;
});

//本１件削除
router.route("/:id").delete((req, res) => {
  const book = Book.findById(req.params.id);
  book
    .deleteOne()
    .then(() => res.json("Book deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

//本情報更新
router.route("/update/:id").put((req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      book.title = req.body.title;
      book.category = req.body.category;
      book.imagePass = req.body.imagePass;
      book.author = req.body.author;
      book.releaseAt = req.body.releaseAt;
      book.thoughts = req.body.thoughts;
      book.link = req.body.link;

      book
        .save()
        .then(() => res.json("Book updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});
//ブログ検索機能（タイトル）
router.route("/search/title").post((req, res) => {
  Book.find({ title: { $regex: req.body.title, $options: "i" } })
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json("Error:" + err));
});

//ブログ検索機能（カテゴリー）
router.route("/search/category").post((req, res) => {
  Book.find({ category: { $regex: req.body.category, $options: "i" } })
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
