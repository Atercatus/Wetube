import express from "express";
import routes from "../routes";
import { postRegisterView } from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);

export default apiRouter;
