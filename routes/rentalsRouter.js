import express from "express";

import { deleteRental, getRentals, newRental, returnRental } from "../controllers/rentalsController.js";
import rentalDataValidation from "../middlewares/postRentalMiddleware.js";
import returnDataValidation from "../middlewares/returnRentalMiddleware.js";

const rentalsRoute = express.Router();

rentalsRoute.get("/rentals", getRentals);
rentalsRoute.post("/rentals", rentalDataValidation, newRental);
rentalsRoute.post("/rentals/:id/return", returnDataValidation, returnRental);
rentalsRoute.delete("/rentals/:id", returnDataValidation, deleteRental);

export default rentalsRoute;