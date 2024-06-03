import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import userModel from "../models/userModel.mjs";

const userController = {
  createUser: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password, email } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        username,
        password: hashedPassword,
        email,
        registered_on: new Date(),
      };

      const createUser = await userModel.createUser(newUser);

      delete createUser.password;

      res.status(201).json(createUser);
    } catch (error) {
        next(error)
    }
  },
};
