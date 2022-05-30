import connection from "./../database.js";

async function getCategories (req, res) {
    try {
        const result = await connection.query(`select * from categories`);

        res.send(result.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function insertNewCategorie (req, res) {
    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [req.body.name]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { getCategories, insertNewCategorie };