const router = require("express").Router();
let User = require("../models/user.model");

//全てのユーザーを表示する
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

//ユーザーを追加する
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);

  const newUser = new User({ name, age });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
