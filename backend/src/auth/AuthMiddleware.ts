import { FBAuth } from "./FBAuth"
import { TokenError } from "../controllers/customErrors/TokenError";
import { Request, Response } from "express";

/**
 * Middleware that can be added at route level to add firebase authentication to a controller
 * Expects a valid firebase jwt token in headers.authorization
 * @param req HTTP request
 * @param res HTTP response
 * @param next reference to controller function to be executed if auth passes
 */
export const authMiddleware = async (req: Request, res: Response, next: any) => {
  try {if (req.headers.authorization) {
    await FBAuth.auth()
      .verifyIdToken(req.headers.authorization)
      .then((decodedToken) => {
        next()
      })
      .catch((e) => {
        console.log(e);
        throw new TokenError("Invalid Token!");
      });
  } else {
    throw new TokenError("No Token!");
  }}
  catch (e) {
    res.status(400).json({ error: "Unauthorized!" });
  }
};