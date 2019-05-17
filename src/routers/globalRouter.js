import express from "express";
import routes from "../routes"; // export default
import passport from "passport";
import { home, search } from "../controllers/videoControllers";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  postGithubLogin,
  googleLogin,
  postGoogleLogin,
  githubAuth,
  githubLogin
} from "../controllers/userControllers";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(routes.githubCallback, githubAuth, postGithubLogin);

globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: routes.login }),
  postGoogleLogin
);

export default globalRouter;
