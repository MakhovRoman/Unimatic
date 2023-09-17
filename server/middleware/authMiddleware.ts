import jwt from 'jsonwebtoken';
import { Request, Response } from "express";

// @ts-ignore
export const authMiddleware = (req: Request, res: Response, next: any) => {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization!.split(' ')[1] // separate type token and his body

    if (!token) {
      return res.status(401).json({message: "Не авторизован"});
    }

    const decoded = jwt.verify(token, JSON.stringify(process.env.SECRET_KEY));
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({message: "Не авторизован"})
  }
}
