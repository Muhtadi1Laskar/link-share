import express from "express";
import { CreateLinkController, RetriveAllLinksController } from "../controllers/links.controller.js";
import { verifyJWT } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/all", verifyJWT, RetriveAllLinksController);
router.post("/create", verifyJWT, CreateLinkController);

export default router;