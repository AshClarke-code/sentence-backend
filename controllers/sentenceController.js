const Sentence = require("./../models/sentenceModel");
const factory = require("./handlerFactory");



exports.getAllSentences = factory.getAll(Sentence, "sentences");
exports.getOneSentence = factory.getOne(Sentence, "sentence");
exports.createSentence = factory.createOne(Sentence, "sentence");
exports.updateOneSentence = factory.updateOne(Sentence, "sentence");
exports.deleteOneSentence = factory.deleteOne(Sentence);