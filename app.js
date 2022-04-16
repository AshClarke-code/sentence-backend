const express = require("express");
const AppError = require("./utils/appError");
const errorhandler = require("./controllers/errorController");
const sentenceRouter = require("./routes/sentenceRoutes");
const wordRouter = require("./routes/wordRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

//CORS!!!
app.use((req, res, next) => {
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

// NB# Please note, in development auth is bypassed and the specified test user is used by default
// test user = userID stored at process.env.TEST_USER_ID

app.use("/api/v1/sentences", sentenceRouter);
app.use("/api/v1/words", wordRouter);
app.use("/api/v1/users", userRouter);


app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});


app.use(errorhandler);
  

  
module.exports = app;