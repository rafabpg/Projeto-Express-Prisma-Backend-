import { Router } from "express";
import { usersRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";
// import { postsRoutes } from "./posts.routes";

const router = Router();

router.use("/users",usersRoutes);
router.use("/auth",authRoutes);


export {router}