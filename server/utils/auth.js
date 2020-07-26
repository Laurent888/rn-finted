const jwt = require("jsonwebtoken");

exports.createToken = async ({ email, username }) => {
  const token = await jwt.sign({ email, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

exports.verifyToken = async (token) => {
  try {
    const isValid = await jwt.verify(token, process.env.JWT_SECRET);

    const { email, username } = isValid;

    return {
      email,
      username,
    };
  } catch (error) {
    return null;
  }
};
