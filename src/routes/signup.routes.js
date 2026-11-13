import express from "express";
import SignupController from "../controllers/signup.controller.js";

const router = express.Router();

router.post("/", SignupController);

export default router;