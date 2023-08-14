import db from "../database/database.connection.js";

export async function createPost(req, res) {
    const { name_dog, image, description } = res.locals.post;
    const user = res.locals.user;

    try {
        await db.query(
            `INSERT INTO posts (name_dog, image, description, user_id) VALUES ($1, $2, $3, $4);`,
            [name_dog, image, description, user.rows[0].id]
        );
        res.status(201).send("Post cadastrado com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao cadastrar post");
    }
}

export async function getPosts(req, res) {
    try {
        const posts = await db.query("SELECT * FROM posts;");
        if (posts.rows.length === 0) {
            return res.sendStatus(404);
        }
        res.send(posts.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter posts");
    }
}

export async function getPostById(req, res) {
    const { id } = req.params;

    try {
        const idPost = await db.query(`
            SELECT 
                posts.*,
                users.name,
                users.phone
            FROM posts 
            JOIN users ON posts.user_id = users.id
            WHERE posts.id=$1;`,
            [id]
        );
        if (idPost.rows.length === 0) {
            return res.status(404).send("Post não encontrado");
        }
        const post = idPost.rows[0];
        res.send({
            id: post.id,
            name_dog: post.name_dog,
            image: post.image,
            description: post.description,
            name: post.name,
            phone: post.phone,
            active: post.active
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter post por ID");
    }
}

export async function updatePost(req, res) {
    const { id, available } = req.body;
    try {
        await db.query("UPDATE posts SET active=$1 WHERE id=$2;", [available, id]);
        res.status(200).send("Disponibilidade do post atualizada com sucesso");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar disponibilidade do post");
    }
}

export async function getAllPostById(req, res) {
    const { id } = req.params;
    try {
        const postSelect = await db.query("SELECT * FROM posts WHERE user_id=$1;", [id]);
        if (postSelect.rows.length === 0) {
            return res.status(404).send("Posts não encontrados");
        }
        res.status(200).send(postSelect.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao obter posts por ID de usuário");
    }
}
