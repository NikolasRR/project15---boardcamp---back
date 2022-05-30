import joi from "joi";
import connection from "../database.js";

async function categorieNameValidation (req, res, next) {
    const nameSchema = joi.string().required();

    const validation = nameSchema.validate(req.body.name);
    if (validation.error) {
        return res.sendStatus(400);
    }

    try {
        const result = await connection.query(`SELECT * FROM categories WHERE name = $1`, [req.body.name]);
        if (result.rows[0]) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default categorieNameValidation;