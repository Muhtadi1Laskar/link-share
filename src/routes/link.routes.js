import express from "express";
import { verifyJWT } from "../middlewares/authenticate.js";
import { 
    CreateLinkController, 
    DeleteLinkController, 
    RetriveAllLinksController 
} from "../controllers/links.controller.js";

const router = express.Router();

router.get("/all", verifyJWT, RetriveAllLinksController);
router.post("/create", verifyJWT, CreateLinkController);
router.delete("/delete", verifyJWT, DeleteLinkController)

export default router;