const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log(token);
  // console.log(process.env.ACCESS_TOKEN_SECRET);

  if (!token){
    console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    return res
      .status(401)
      .json({ message: "Access Denied. No token available!" });
  }

  // try {
    // console.log(req.body);
    const decoded = jwt.verify(token, "secretKey");
    // console.log(decoded);
    req.user = decoded;
    req.body.user = decoded.id;
    next();
  // } catch (err) {
  //   return res.status(401).json({ message: "Access denied. Invalid token!" });
  // }
};

module.exports = authMiddleware;
