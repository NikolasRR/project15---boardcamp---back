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
    const { id } = req.params;

    try {
        const result = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        if (result.rows[0]) {
            return res.send(result.rows[0]);
        }

        res.sendStatus(404);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function insertNewCustomer (req, res) {
    const {name, phone, cpf, birthday} = req.body;

    try {
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) 
            VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
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