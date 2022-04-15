const Word = require("./../models/wordModel");
const factory = require("./handlerFactory");


exports.getAllWords = factory.getAll(Word, "words");
exports.getOneWord = factory.getOne(Word, "word");
exports.createWord = factory.createOne(Word, "word");
exports.updateOneWord = factory.updateOne(Word, "word");
exports.deleteOneWord = factory.deleteOne(Word);