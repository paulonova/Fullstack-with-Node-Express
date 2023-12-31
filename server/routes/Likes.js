const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  /**
   * found: check if there is a Like
   * if its true, on click delete the like 
   * if its false, on click create the Like.
   */
  const found = await Likes.findOne({
    where: {
      PostId: PostId,
      UserId: UserId,
    },
  });

  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({liked: true});
  } else {
    await Likes.destroy({ 
      where: { 
        PostId: PostId, 
        UserId: UserId 
      } 
    });
    res.json({liked: false});
  }
});

module.exports = router;
