import express from "express";
import routes from "../routes"; // export default
import { home, search } from "../controllers/videoControllers";
import { login, logout, getJoin, postJoin,
         getLogin, postLogin } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
 

export default globalRouter;