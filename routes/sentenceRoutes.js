const express = require("express");
const sentenceController = require("../controllers/sentenceController");
const {protect} = require("./../controllers/authController");


const router = express.Router({ mergeParams: true});

router.use(protect);

router.route("/")
.get(sentenceController.getAllSentences)
.post(sentenceController.createSentence);

router.route("/:id")
.get(sentenceController.getOneSentence)
.patch(sentenceController.updateOneSentence)
.delete(sentenceController.deleteOneSentence);

module.exports = router;