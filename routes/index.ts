import { Router } from "express";
import { authRouter } from "./auth.route";

export const mainRouter = Router()

mainRouter.use('/auth', authRouter)

