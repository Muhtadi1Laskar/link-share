import express from "express";
import { CreateLinkController } from "../controllers/links.controller.js";
import { verifyJWT } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/create", verifyJWT, CreateLinkController);

export default router;