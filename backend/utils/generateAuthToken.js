const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, firstname, lastName, email) => {
  return jwt.sign(
    { _id, firstname, lastName, email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7h" }
  );
};
module.exports = generateAuthToken
