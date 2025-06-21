import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../Database/models/userModel";
import { IExtendedRequest } from "./type";

const isLoggedIn = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      message: "please provide token",
    });
    return;
  }

  jwt.verify(token, "thisisecret", async (erroraayo, resultaayo: any) => {
    if (erroraayo) {
      console.log(erroraayo);
      res.status(403).json({
        message: "Token invalid vayooo",
      });
      return;
    }

    const userData = await User.findByPk(resultaayo.id);

    if (!userData) {
      res.status(403).json({
        message: "No user with that id, invalid token ",
      });
      return;
    }
    // In your authentication middleware file
    req.user = {
      email: userData.email,
      role: userData.role,
      userName: userData.username,
      id: userData.id,
      currentInstituteNumber: userData.currentInstituteNumber, // ✅ ADD THIS LINE
    };

    next(); // ✅ Call next() only after everything is successful
  });
};

export default isLoggedIn;
