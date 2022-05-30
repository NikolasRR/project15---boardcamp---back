import express from "express";

import { getCategories, insertNewCategorie } from "../controllers/categoriesController.js";
import categorieNameValidation from "../middlewares/postCategorieMiddleware.js";

const categoriesRoute = express.Router();

categoriesRoute.get("/categories", getCategories);
categoriesRoute.post("/categories", categorieNameValidation, insertNewCategorie);

export default categoriesRoute;