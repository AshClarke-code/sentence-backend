const express = require("express");
const AppError = require("./utils/appError");
const errorhandler = require("./controllers/errorController");
const sentenceRouter = require("./routes/sentenceRoutes");
const wordRouter = require("./routes/wordRoutes");

const app = express();

//CORS!!!
app.use((req, res, next) => {
    //origin = domain making request
    //wildcard * doesn't work when trying to send credentials(cookie)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

app.use(express.json( { limit: "10kb" }));




// open endpoints for words, sentences and users


app.use("/api/v1/sentences", sentenceRouter);
app.use("/api/v1/words", wordRouter);


app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


app.use(errorhandler);
  

  
module.exports = app;