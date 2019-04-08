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

app.set("view engine", "pug");

// 디렉토리에서 파일을 보내준다
// /uploads 의 url을 통해 요청이 들어오면 현재파일디렉토리/uploads의 파일을 서비스해준다.
// 이는 좋지 않은 설계 => 서버에 파일이 존재하면 안된다.
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// local var to global var
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
