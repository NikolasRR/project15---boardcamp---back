import connection from "./../database.js";

async function getCustomers (req, res) {
    const searchValue = req.query.cpf;

    try {
        if (searchValue) {
            const result = await connection.query(
                `SELECT * FROM customers WHERE cpf LIKE ($1 || '%')`,
            [searchValue]);
            return res.send(result.rows);
        }
        const result = await connection.query(`SELECT * FROM customers`);
        res.send(result.rows);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function getOneCustomer (req, res) {
    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [req.body.name]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function insertNewCustomer (req, res) {
    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [req.body.name]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function updateCustomer (req, res) {
    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [req.body.name]);
        res.sendStatus(201);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { getCustomers, getOneCustomer, insertNewCustomer, updateCustomer };