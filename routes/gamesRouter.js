import express from "express";

import { getGames, insertNewGame } from "../controllers/gamesController.js";
import gameDataValidation from "../middlewares/postGameMiddleware.js";

const gamesRoute = express.Router();

gamesRoute.get("/games", getGames);
gamesRoute.post("/games", gameDataValidation, insertNewGame);

export default gamesRoute;