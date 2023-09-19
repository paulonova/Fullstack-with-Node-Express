const express = require("express");
const app = express();
const db = require("./models");

//Router
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server Running on port 3001");
  });
});
