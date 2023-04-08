import { Router } from "express";
import * as UserControllers from "../controllers/user.js";
import checkAuthenticatedUser from "../middlewares/checkAuthenticatedUser.js";

const userRoute = Router();

userRoute.get(
  "/",
  checkAuthenticatedUser,
  UserControllers.getAuthenticatedUser
);

userRoute.post("/login", UserControllers.Login);

userRoute.post("/signup", UserControllers.Signup);

userRoute.patch(
  "/update",
  checkAuthenticatedUser,
  UserControllers.updateProfile
);

userRoute.post("/logout", UserControllers.Logout);

export default userRoute;
