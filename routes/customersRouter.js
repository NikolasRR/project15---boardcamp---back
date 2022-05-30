import express from "express";
import { getCustomers, getOneCustomer, insertNewCustomer, updateCustomer } from "../controllers/customersController.js";
import customerDataValidation from "../middlewares/postCustomerMiddleware.js";


const customersRoute = express.Router();

customersRoute.get("/customers", getCustomers);
customersRoute.get("/customers/:id", getOneCustomer);
customersRoute.post("/customers", customerDataValidation, insertNewCustomer);
customersRoute.put("/customers/:id", customerDataValidation, updateCustomer);

export default customersRoute;