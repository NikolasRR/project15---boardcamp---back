import connection from "./../database.js";
import dayjs from "dayjs";

async function getCustomers (req, res) {
    const searchValue = req.query.cpf;

    try {
        if (searchValue) {
            const result = await connection.query(
                `SELECT * FROM customers WHERE cpf LIKE ($1 || '%')`,
            [searchValue]);
            result.rows.forEach(customer => customer.birthday = dayjs(customer.birthday).format("YYYY-MM-DD"));
            return res.send(result.rows);
        }

        const result = await connection.query(`SELECT * FROM customers`);
        result.rows.forEach(customer => customer.birthday = dayjs(customer.birthday).format("YYYY-MM-DD"));
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
            result.rows[0].birthday = result.rows[0].birthday.toLocaleDateString().split("/").reverse().join("-");
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
    const {name, phone, cpf, birthday} = req.body;

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

export { getCustomers, getOneCustomer, insertNewCustomer, updateCustomer };