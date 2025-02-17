import express from "express";
import { googleFirebase, signin, signup} from "../controllers/auth.controller.js";
import { signinMiddleware, signupMiddleware } from "../middleware/auth.middleware.js";
import { verifyToken } from "../middleware/firebaseMiddleware.js";
const authRouter = express.Router();

authRouter.post("/signup", signupMiddleware, signup);

authRouter.post("/signin", signinMiddleware, signin);

authRouter.post("/google", verifyToken, googleFirebase);

  
// authRouter.post("/signout", signoutMiddleware, signout);

export default authRouter