import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import path from "path";
import morgan from "morgan";
import createError from "http-errors";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const server = express();
const { PORT } = process.env;

if (process.env.NODE_ENV === "production") {
  server.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(express.static(path.join(__dirname, "../build")));
server.use("/", router);

server.use((_req, _res, next) => {
  next(createError(404));
});

server.use((error, _req, res, _next) => {
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
