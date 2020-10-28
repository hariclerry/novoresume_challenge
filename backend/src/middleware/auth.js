const jwt = require('jsonwebtoken');

//constants
const SECRET_TOKEN = `${process.env.TOKEN_SECRET}`;

const generateAccessToken = (id) => {
    const accessToken = jwt.sign({ id }, SECRET_TOKEN, {
      expiresIn: "8h",
    });
    return accessToken;
}

const authenticateToken = (req, res, next) => {
  const accessToken = req.header("authorization");
      if (!accessToken)
        return res.status(401).send("Access denied. No token provided.");
      let payload;
      try {
        payload = jwt.verify(accessToken, SECRET_TOKEN);
        next();
      } catch (error) {
        res.status(400).send("Invalid token.");
      }
}

module.exports = { generateAccessToken, authenticateToken };