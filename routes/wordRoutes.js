const express = require("express");
const wordController = require("../controllers/wordController");


const router = express.Router({ mergeParams: true});


router.route("/")
.get(wordController.getAllWords)
.post(wordController.createWord);

router.route("/:id")
.get(wordController.getOneWord)
.patch(wordController.updateOneWord)
.delete(wordController.deleteOneWord);

module.exports = router;