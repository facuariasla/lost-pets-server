import * as crypto from "crypto";
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

//https://stackoverflow.com/questions/6984139/how-can-i-get-the-sha1-hash-of-a-string-in-node-js
export function getSHA256(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// La peticion fetch tiene que llamar a
// localStorage.getItem('token_petlost');
export const authMiddleware = (req, res, next) => {
  // Authorization: bearer token
  try {
    const randomValor = process.env.JSONWEBTOKEN_SHHH;
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, randomValor);
    req._user = data;
    console.log(data)
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
    console.log('q panso')
  }
};
