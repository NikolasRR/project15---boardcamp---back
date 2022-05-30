import connection from "./../database.js";
import dayjs from "dayjs";

const query =
    `SELECT json_build_object(
    'id', rentals.id,
    'customerId', rentals."customerId",
    'gameId', rentals."gameId",
    'rentDate', rentals."rentDate",
    'daysRented', rentals."daysRented",
    'returnDate', rentals."returnDate",
    'originalPrice', rentals."originalPrice",
    'delayFee', rentals."delayFee",
    'customer', json_build_object(
        'id', customers.id,
        'name', customers.name
    ),
    'game', json_build_object(
        'id', games.id,
        'name', games.name,
        'categoryId', games."categoryId",
        'categoryName', categories.name
    )
)
FROM rentals 
JOIN customers
    ON rentals."customerId" = customers.id
JOIN games
    ON rentals."gameId" = games.id
JOIN categories
    ON games."categoryId" = categories.id`;

async function getRentals(req, res) {
    try {
        if (req.query.customerId) {
            const result = await connection.query(query + ` WHERE customers.id = $1`, [req.query.customerId]);
            const rentals = result.rows.map(rental => rental.json_build_object);
            return res.send(rentals);
        }

        if (req.query.gameId) {
            const result = await connection.query(query + ` WHERE games.id = $1`,
                [req.query.gameId]);
            const rentals = result.rows.map(rental => rental.json_build_object);
            return res.send(rentals);
        }

        const result = await connection.query(query);
        const rentals = result.rows.map(rental => rental.json_build_object);
        res.send(rentals);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function newRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD");

    try {
        const game = await connection.query(`SELECT "pricePerDay" FROM games WHERE id = $1`, [gameId]);
        const originalPrice = game.rows[0].pricePerDay * daysRented;

        const result = await connection.query(
            `INSERT INTO rentals 
            ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
            [customerId, gameId, daysRented, rentDate, originalPrice, null, null]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function returnRental(req, res) {
    const { id } = rez.params;
    const returnDate = dayjs().format("YYYY-MM-DD");

    try {
        const result = await connection.query(
            `SELECT rentals.*, games."pricePerDay" 
            FROM rentals 
            JOIN games ON rentals."gameId" = games.id
            WHERE "gameId" = $1`, [id]
        );
        const dayOfRent = parseInt(result.rows[0].rentDate.split("-")[2]);
        const dayOfReturn = parseInt(returnDate.split("-")[2]);

        const delayFee = result.rows[0].pricePerDay * (dayOfReturn - dayOfRent);

        await connection.query(
            `UPDATE rentals 
            SET "returnDate" = $1, "delayFee" = $2
            WHERE "gameId" = $3`, [returnDate, delayFee, id]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function deleteRental(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(
            `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 
            WHERE id = $5`,
            [name, phone, cpf, birthday, req.params.id]
        );
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { getRentals, newRental, returnRental, deleteRental };