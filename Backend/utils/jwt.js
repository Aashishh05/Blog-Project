import jwt from "jsonwebtoken";

export const generateToken = (userId, secret, expiresIn) => {
  return jwt.sign({ Id: userId }, secret, { expiresIn });
};
