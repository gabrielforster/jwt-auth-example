import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../model/user";
import * as utils from "../../utils/utils";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { first_name, last_name, email, password } = req.body;

    if(!(first_name && last_name && email && password)) throw new Error("All inputs are required");

    const oldUser = await User.findOne({ email });

    if(oldUser) throw new Error("User already exists. Please login");

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ first_name, last_name, email, password: encryptedPassword });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    return res.status(201).json(user);
  }
  catch (error) {
    next(error);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if(!(email && password)) throw new Error("All inputs are required");

    const user = await User.findOne({ email });

    if(user && (await utils.comparePasswords(password, user.password as string))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    }

    throw new Error("Invalid credentials");
  }
  catch (error) {
    next(error);
  }
}