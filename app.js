import express from "express";
//const express = require("express"); // 우선 현재 디렉토리에서 찾고 없으면 node_modules에서 찾는다.
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
// export default가 아니기 때문에 이런식으로  import 해야한다.

const app = express();

app.set('view engine', "pug");

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

// local var to global var
app.use(localsMiddleware)

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;