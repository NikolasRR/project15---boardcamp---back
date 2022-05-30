import express from "express";

import { deleteRental, getRentals, newRental, returnRental } from "../controllers/rentalsController.js";

const rentalsRoute = express.Router();

rentalsRoute.get("/rentals", getRentals);
rentalsRoute.post("/rentals", newRental);
rentalsRoute.post("/rentals", returnRental);
rentalsRoute.delete("/rentals", deleteRental);

export default rentalsRoute;