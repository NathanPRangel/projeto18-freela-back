import db from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
    const { name, cpf, phone, email, password } = res.locals.user;

    try {
        const hash = bcrypt.hashSync(password, 10);
        await db.query("INSERT INTO users (name, cpf, phone, email, password) VALUES ($1, $2, $3, $4, $5);", [name, cpf, phone, email, hash]);
        res.status(201).send("Cadastro efetuado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao cadastrar usuário");
    }
}

export async function signIn(req, res) {
    const user = res.locals.user;
    const checkUser = res.locals.checkUser;

    const userToken = uuid();

    try {
        await db.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`, [checkUser.rows[0].id, userToken]);
        const userQuery = await db.query("SELECT id, name FROM users WHERE email = $1;", [user.email]);
        const { id, name } = userQuery.rows[0];
        res.status(200).json({ token: userToken, id, name });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao fazer login");
    }
}
