import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export interface UserPayload {
  user_id: string;
  username: string;
  full_name: string;
  email: string;
  user_roles: string[];
  business_unit: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, config.auth.jwt) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
