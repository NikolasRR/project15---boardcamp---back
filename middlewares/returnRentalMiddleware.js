import connection from "../database.js";

async function returnDataValidation (req, res, next) {
    try {
        const rentalExists = await connection.query(`SELECT * FROM customers WHERE id = $1`, [req.params.id]);
        if (!rentalExists.rows[0]) {
            return res.sendStatus(404);
        }

        const rentalIsOpen = await connection.query(`SELECT * FROM customers WHERE id = $1`, [req.params.id]);
        if (rentalExists.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default returnDataValidation;