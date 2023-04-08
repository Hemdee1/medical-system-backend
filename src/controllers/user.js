import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import uploadImage from "../utils/uploadImage.js";

export const getAuthenticatedUser = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await userModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const Signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All parameters are required!" });
    }

    const existingEmail = await userModel.findOne({ email }).exec();

    if (existingEmail) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const data = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    // Have to go throuth all these stress in other
    // to remove the password without setting it to null 😤

    // eslint-disable-next-line no-unused-vars
    const { password: pass, ...rest } = data._doc;
    const user = rest;

    // create a session for the user
    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All parameters are required" });
    }

    const userCheck = await userModel.findOne({ email }).select("+password");

    if (!userCheck) {
      return res.status(401).json({ error: "Email is incorrect" });
    }

    const passwordMatch = await bcrypt.compare(password, userCheck.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    // fetch another user without the password
    const user = await userModel.findOne({ email }).exec();

    // create a session for the user
    req.session.userId = user._id;

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.session.userId;
  const { img } = req.body;

  try {
    const userData = await userModel.findById(userId);

    // check if there is a different image and set it
    if (img && img !== userData?.img) {
      const imgUrl = await uploadImage(userId, img);

      req.body.img = imgUrl;
    }

    const user = await userModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

export const Logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(401).json(error);
    } else {
      res.sendStatus(200);
    }
  });
};
