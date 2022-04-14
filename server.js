const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config({
    path: ".env"
  });
  const port = process.env.PORT || 3000;
  
  const app = require("./app");
  
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"))
  .catch( err => console.error(err));
  
  
  const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });