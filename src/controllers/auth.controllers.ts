import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Auth } from "../models/auths";

export function getSHA256(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

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
    return res.status(401).json({ message: error.message });
  }
};
export const getUserAuth = async (req, res) => {
  try {
    console.log(req._user);
    const { id } = req._user;
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
