import connection from "./../database.js";

async function getGames(req, res) {
    let searchValue = req.query.name;

    try {
        if (searchValue) {
            //search value adapting
            let array = searchValue.split(" ");
            let searchValueList = array.map(str => str[0].toUpperCase() + str.substring(1).toLowerCase());
            searchValue = searchValueList.join(" ");

            const result = await connection.query(
                `SELECT games.*, categories.name AS "categoryName" FROM games 
                JOIN categories ON games."categoryId" = categories.id 
                WHERE games.name LIKE ($1 || '%')`, 
            [searchValue]);
            return res.send(result.rows);
        }

        const result = await connection.query(
            `SELECT games.*, categories.name AS "categoryName" FROM games 
            JOIN categories ON games."categoryId" = categories.id`);
        return res.send(result.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function insertNewGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connection.query(`INSERT INTO games 
            (name, image, "stockTotal", "categoryId", "pricePerDay") 
            VALUES ($1, $2, $3, $4, $5)`,
            [name, image, stockTotal, categoryId, pricePerDay]);

        return res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { getGames, insertNewGame };