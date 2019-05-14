import express from "express";
//const express = require("express"); // 우선 현재 디렉토리에서 찾고 없으면 node_modules에서 찾는다.
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
// export default가 아니기 때문에 이런식으로  import 해야한다.
import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// 디렉토리에서 파일을 보내준다
// /uploads 의 url을 통해 요청이 들어오면 현재파일디렉토리/uploads의 파일을 서비스해준다.
// 이는 좋지 않은 설계 => 서버에 파일이 존재하면 안된다.
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));

app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// local var to global var
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
