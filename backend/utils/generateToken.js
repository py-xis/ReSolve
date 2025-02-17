import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


function generateToken(userId) {
  const payload = {
    userId : userId
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export default generateToken;
