import express from "express";
import cors from "cors";
import chalk from "chalk";
import "dotenv/config";

import categoriesRoute from "./routes/categoriesRouter.js";
import gamesRoute from "./routes/gamesRouter.js";
import customersRoute from "./routes/customersRouter.js";
import rentalsRoute from "./routes/rentalsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoriesRoute);
app.use(gamesRoute);
app.use(customersRoute);
app.use(rentalsRoute);

app.listen(process.env.PORT, () =>
  console.log(chalk.bold.blue("Server running on port " + process.env.PORT))
);