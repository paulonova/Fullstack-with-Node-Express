const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({error: "User not Logged In..."});
  }

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: error });
  }
};

module.exports = { validateToken };


/**
 * req.user = validToken.username;
 * Here I create a variable "user" and set all information I stored in token.
 * Then I can access this variable in all my requests.. 
 */