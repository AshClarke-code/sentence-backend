const express = require("express");
const sentenceController = require("../controllers/sentenceController");


const router = express.Router({ mergeParams: true});


router.route("/")
.get(sentenceController.getAllSentences)
.post(sentenceController.createSentence);

router.route("/:id")
.get(sentenceController.getOneSentence)
.patch(sentenceController.updateOneSentence)
.delete(sentenceController.deleteOneSentence);

module.exports = router;