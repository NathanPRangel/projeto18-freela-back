import { postSchema } from "../schemas/postSchema.js";

export async function PostValidation(req, res, next) {
    const post = req.body;

    try {
        await postSchema.validateAsync(post, { abortEarly: false });
        res.locals.post = post;
        next();
    } catch (error) {
        const errorsMessage = error.details.map(detail => detail.message);
        res.status(422).send(errorsMessage);
    }
}
