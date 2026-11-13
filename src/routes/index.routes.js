import express from "express";
import authenticationRouter from "./authentication.routes.js";
import LinkRouter from "./link.routes.js";

const router = express.Router();

router.use("/auth", authenticationRouter);
router.use("/link", LinkRouter);

export default router;