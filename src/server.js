import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

dotenv.config();

const server = express();
const { PORT } = process.env;

server.use(express.json());
server.use(cors());
server.use("/", router);
server.use(express.static("build"));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
