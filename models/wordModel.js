const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        minLength: [1, "Words must be at least 1 character long."]
    },
    type: {
        type: String,
        required: [true, "Words must have a type associated with them."],
        enum: ["noun", "verb", "adjective", "determiner", "conjunction", "adverb", "pronoun", "preposition", "exclamation"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});



const Word = mongoose.model("Word", wordSchema);
module.exports = Word;