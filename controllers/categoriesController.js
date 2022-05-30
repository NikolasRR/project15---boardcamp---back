import connection from "./../database.js";

async function getCategories(req, res) {
    try {
        const result = await connection.query(`select * from categories`);

        res.send(result.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function postCategorie(req, res) {
    try {
        console.log("teste");
        const result = await connection.query(`select * from categories`);
        console.log(result.rows);
        res.send(result.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
}

export { getCategories, postCategorie };