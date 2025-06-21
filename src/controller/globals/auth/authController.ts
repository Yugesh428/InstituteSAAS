import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../Database/models/userModel";
import jwt from "jsonwebtoken";

// Functional approach
const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.status(400).json({
      message: "Please provide username, password or email",
    });
    return;
  }

  try {
    await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 12),
    });

    res.status(200).json({
      message: "User added Successfully",
    });
  } catch (error) {
    console.log("Create User Failed", error);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

export { registerUser };

// Class-based approach
class AuthController {
  static async registerUser(req: Request, res: Response) {
    await registerUser(req, res);
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Please fill in all fields",
      });
      return;
    }

    try {
      const users = await User.findAll({
        where: { email },
      });

      if (users.length === 0 || !users[0]?.password) {
        res.status(404).json({
          message: "Not registered",
        });
        return;
      }

      const isPasswordMatch =
        users[0]?.password && bcrypt.compareSync(password, users[0].password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          { id: users[0].id },
          "thisisecret", // should use process.env.JWT_SECRET in real apps
          { expiresIn: "1h" }
        );

        res.status(200).json({
          message: "Login successful",
          token,
          user: users[0],
        });
      } else {
        res.status(401).json({
          message: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login Error:", error); // for debugging
      res.status(500).json({
        message: "Error logging in user",
      });
    }
  }
}

export default AuthController;
