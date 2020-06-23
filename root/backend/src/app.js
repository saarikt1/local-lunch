import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

dotenv.config();

const app = express();

const { PORT } = process.env;

app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
