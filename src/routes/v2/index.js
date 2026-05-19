import { Router } from "express";
import { router as usersRoutes } from "./users.route.js"

export const router = Router()

router.use("/users",usersRoutes);