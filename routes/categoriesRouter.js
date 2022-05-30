import express from "express";
import { getCategories, postCategorie } from "../controllers/categoriesController.js";

const categoriesRoute = express.Router();

categoriesRoute.get("/categories", getCategories);
categoriesRoute.post("/categories", postCategorie);

export default categoriesRoute;