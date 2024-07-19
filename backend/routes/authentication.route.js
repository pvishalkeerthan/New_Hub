import express, { Router } from "express";
import {
  userSignUp,
  userLogin,
  userLogout,
} from "../controllers/authentication.controller.js";

const router = express.Router();
router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/logout", userLogout);

export default router;
