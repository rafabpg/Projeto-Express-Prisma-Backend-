import { Router } from "express";
import { usersRoutes } from "./user.routes";
// import { postsRoutes } from "./posts.routes";

const router = Router();

router.use("/users",usersRoutes);
// router.use("/posts",postsRoutes);


export {router}