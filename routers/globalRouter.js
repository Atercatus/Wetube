import express from "express";
import routes from "../routes"; // export default
import { home, search } from "../controllers/videoControllers";
import { login, join, logout } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
 

export default globalRouter;