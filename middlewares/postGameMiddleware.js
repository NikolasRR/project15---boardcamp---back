import joi from "joi";
import connection from "../database.js";

async function gameDataValidation (req, res, next) {
    const gameDataSchema = joi.object({
        name: joi.string().required(),
        image: joi.allow(),
        stockTotal: joi.number().greater(0).required(),
        pricePerDay: joi.number().greater(0).required(),
        categoryId: joi.number().required()
    });

    const validation = gameDataSchema.validate(req.body);
    if (validation.error) {
        return res.sendStatus(400);
    }

    //name correction
    const name = req.body.name;
    let nameList = name.split(" ");
    let newNameList = nameList.map(str => str[0].toUpperCase() + str.substring(1).toLowerCase());
    req.body.name = newNameList.join(" ");

    try {
        const categoryExists = await connection.query(`SELECT * FROM categories WHERE id = $1`, [req.body.categoryId]);
        if (!categoryExists.rows[0]) {
            return res.sendStatus(400);
        }

        const gameAlreadyExists = await connection.query(`SELECT * FROM games WHERE name = $1`, [req.body.name]);
        if (gameAlreadyExists.rows[0]) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default gameDataValidation;