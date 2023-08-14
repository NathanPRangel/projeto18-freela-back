import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { SignInValidation, SignUpValidation } from "../middlewares/auth.middlewares.js";

const authRouter = Router()

authRouter.post('/signup', SignUpValidation,signUp)
authRouter.post('/signin', SignInValidation,signIn)

export default authRouter