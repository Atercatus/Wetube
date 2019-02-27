import express from "express";
//const express = require("express"); // 우선 현재 디렉토리에서 찾고 없으면 node_modules에서 찾는다.
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

const handleHome = (req, res) => { // next가 없음 -> 마지막 함수이기 때문
    res.send("Hello from my ass");
}

const betweenHome = (req, res, next) => { // middleware
    console.log("Between");
    next();
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(helmet());

app.get("/", betweenHome, handleHome);


app.listen(PORT, () => {
    console.log(`Listening on : http://localhost:${PORT}`);
});
