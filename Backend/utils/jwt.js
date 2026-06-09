import jwt from "jsonwebtoken";

export const generateToken = (userId, secret, expiresIn) => {
//   console.log({ Id: userId }, secret, { expiresIn });
  return jwt.sign({ Id: userId }, secret, { expiresIn });
};
