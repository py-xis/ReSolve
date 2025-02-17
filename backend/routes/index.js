import express from "express";
import authRouter from "./auth.routes.js";
import problemRouter from "./problem.routes.js";
import userRouter from "./user.routes.js";


const routerv1 = express.Router();

routerv1.use("/auth", authRouter);
routerv1.use("/problem", problemRouter);
routerv1.use("/user", userRouter);


export default routerv1;