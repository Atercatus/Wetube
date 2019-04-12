import app from "./app";
// export default 하였기 떄문에 이런식으로 import가 가능하다
import "./db";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListen = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListen);
