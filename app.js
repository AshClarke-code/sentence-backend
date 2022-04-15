const express = require("express");
const AppError = require("./utils/appError");
const errorhandler = require("./controllers/errorController");
const sentenceRouter = require("./routes/sentenceRoutes");
const wordRouter = require("./routes/wordRoutes");

const app = express();

app.use(express.json( { limit: "10kb" }));


// open endpoints for words, sentences and users


app.use("/api/v1/sentences", sentenceRouter);
app.use("/api/v1/words", wordRouter);


app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


app.use(errorhandler);
  

  
module.exports = app;