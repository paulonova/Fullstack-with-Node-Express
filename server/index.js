const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server Running on port 3001");
  });
}).catch((err) => {
  console.log(err);
})

/**
 * 
app.use(): This is a method to define middleware in your Express application. 
Any request to the server will go through the middleware functions in the order 
they are defined (from top to bottom) unless a middleware ends the response cycle.

express.json(): This is a built-in middleware function in Express. 
It parses incoming request bodies with a JSON payload and makes the 
parsed data available on req.body in your route handlers.

 */
