import connection from "../database.js";

async function rentalDataValidation (req, res, next) {
    try {
        const customerExists = await connection.query(`SELECT * FROM customers WHERE id = $1`, [req.body.customerId]);
        if (!customerExists.rows[0]) {
            return res.sendStatus(400);
        }

        const gameExists = await connection.query(`SELECT * FROM customers WHERE id = $1`, [req.body.gameId]);
        if (!gameExists.rows[0]) {
            return res.sendStatus(400);
        }

        if (req.body.daysRented <= 0) {
            return res.sendStatus(400);
        }

        const gameAvailable = await connection.query(
            `SELECT rentals.*, games."stockTotal" 
            FROM rentals 
            JOIN games ON rentals."gameId" = games.id
            WHERE "gameId" = $1`, [req.body.gameId]);

        if (gameAvailable.rows.length === gameAvailable.rows[0].stockTotal) {
            return res.sendStatus(400);
        }


        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export default rentalDataValidation;