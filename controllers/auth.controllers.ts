import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Auth } from "../models/auths";

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
    console.log(data);
    next();
  } catch (error) {
    console.log("q paso");
    return res.status(401).json({ message: error.message });
  }
};

// Ponerle a esto el middleware
export const getUserAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const auth = await Auth.findOne({
      where: {
        userId: id,
      },
    });
    if (!auth) return res.status(404).json({ message: "User does not exist" });
    res.json(auth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

