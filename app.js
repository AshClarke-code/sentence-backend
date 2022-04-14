const express = require("express");

const app = express();

app.use(express.json( { limit: "10kb" }));


app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Endpoint live!"
    });
});
  

  
module.exports = app;