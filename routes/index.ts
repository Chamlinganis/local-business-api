import { Router } from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";

export const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
