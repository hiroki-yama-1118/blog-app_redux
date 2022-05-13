const router = require("express").Router();
const { generateUploadURL } = require("./s3");
// var { deleteFiles } = require("./s3");

// // 画像URL生成
// router.get("/", async (req, res) => {
//   const url = await generateUploadURL();
//   res.send({ url });
// });

// 画像URL生成
router.route("/").get(async (req, res) => {
  const url = await generateUploadURL();
  console.log(url);
  res.send({ url });
});

// // 画像をバケットから削除
// router.delete("/", async (req, res) => {
//   await deleteFiles(req.body.urlArray);
//   res.send({ status: "success" });
// });

module.exports = router;
