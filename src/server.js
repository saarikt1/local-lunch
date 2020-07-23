import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import morgan from "morgan";
import createError from "http-errors";

dotenv.config();

const server = express();
const { PORT } = process.env;

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use("/", router);
server.use(express.static("build"));

server.use((req, res, next) => {
  next(createError(404));
});

server.use((error, req, res, next) => {
  console.log("Error status: ", error.status);
  console.log("Message: ", error.message);

  res.status(error.status || 500);

  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

server.listen(PORT, () => {
  console.log(
    `Listening on port ${PORT} in ${process.env.NODE_ENV} environment`
  );
});
