const mongoose = require("mongoose");

const sentenceSchema = new mongoose.Schema({
    sentence: {
        type: String,
        required: [true, "A sentence must exits in order to be saved."]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});



const Sentence = mongoose.model("Sentence", sentenceSchema);
module.exports = Sentence;