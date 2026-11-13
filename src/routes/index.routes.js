import express from "express";
import authenticationRouter from "./authentication.routes.js";

const router = express.Router();

router.use("/auth", authenticationRouter);

export default router;