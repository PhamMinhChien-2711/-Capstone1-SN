// const jwt = require("jsonwebtoken");
// const { CONFIG } = require("../config/auth.js");

// const verifyToken = (req, res, next) => {
//   const bearerToken = req.headers["authorization"];
//   const token = bearerToken?.split(' ')[1]

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, CONFIG.TOKEN_KEY)
//     req.user = decoded;
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

// module.exports = { verifyToken }