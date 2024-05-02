const {verify} = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const authtoken = req.headers["x-tdp-authtoken"];
    if (!authtoken) throw Error("Unauthorized!");
    
    verify(authtoken, process.env.JWT_SECRET)

    next();
  } catch (error) {
    res.status(400).json({message: "Unauthorized!"})
  }
}

module.exports = authMiddleware