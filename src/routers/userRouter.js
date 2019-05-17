import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  loggedinUserDetail
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar, onlyNotOAuth } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(
  routes.changePassword,
  onlyPrivate,
  onlyNotOAuth,
  getChangePassword
);
userRouter.post(
  routes.changePassword,
  onlyPrivate,
  onlyNotOAuth,
  postChangePassword
);
userRouter.get(routes.me, loggedinUserDetail);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
