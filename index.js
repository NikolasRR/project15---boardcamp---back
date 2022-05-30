import express from "express";
import cors from "cors";
import chalk from "chalk";
import "dotenv/config";

import categoriesRoute from "./routes/categoriesRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoriesRoute);

app.listen(process.env.PORT, () =>
  console.log(chalk.bold.blue("Server running on port " + process.env.PORT))
);