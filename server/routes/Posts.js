const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({
    where: {
      UserId: req.user.id,
    },
  });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.userName = req.user.username;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

// Update the Post Title
router.put("/title", validateToken, async (req, res) => {
  const { newTitle, id } = req.body;
  await Posts.update(
    { title: newTitle },  {
      where: {
        id: id,
      }
    }
  );
  res.json(newTitle); 
});

//Update the post Text
router.put("/postText", validateToken, async (req, res) => {
  const { newText, id } = req.body;
  await Posts.update(
    { postText: newText },  {
      where: {
        id: id,
      }
    }
  );
  res.json(newText);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("POST DELETED SUCCESSFULLY");
});

module.exports = router;
