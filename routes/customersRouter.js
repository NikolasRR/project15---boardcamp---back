import express from "express";
import { getCustomers, getOneCustomer, insertNewCustomer, updateCustomer } from "../controllers/customersController.js";
import newCustomerDataValidation from "../middlewares/postCustomerMiddleware.js";


const customersRoute = express.Router();

customersRoute.get("/customers", getCustomers);
customersRoute.get("/customers/:id", getOneCustomer);
customersRoute.post("/customers", newCustomerDataValidation, insertNewCustomer);
customersRoute.put("/customers/:id", updateCustomer);

export default customersRoute;