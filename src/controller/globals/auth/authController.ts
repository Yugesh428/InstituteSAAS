import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../Database/models/userModel";
import jwt from "jsonwebtoken";

// Functional approach
const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: "Please enter username, email, and password",
    });
  }

  await User.create({
    username,
    password: bcrypt.hashSync(password, 12),
    email,
  });

  return res.status(201).json({
    message: "User Register Successfully",
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email and password",
    });
  }

  const data = await User.findAll({ where: { email } });

  if (data.length === 0) {
    return res.status(404).json({
      message: "User Not registered",
    });
  }

  // const user = users[0];
  const isPasswordMatched = bcrypt.compareSync(password, data[0].password);

  if (isPasswordMatched) {
    const token = jwt.sign(
      {
        id: data[0].id,
      },
      "thisissecret",
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      data: {
        token,
        username: data[0].username,
      },
      message: "Login Successfull",
    });
  } else {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
};

export { registerUser, loginUser };
