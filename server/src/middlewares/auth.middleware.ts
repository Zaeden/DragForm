import { Request, Response, NextFunction } from "express";
import { Payload, verifyToken } from "../utils/token.util";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyToken(token) as Payload;
    req.user = {
      id: decoded.id,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
