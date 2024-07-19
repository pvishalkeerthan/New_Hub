import express from "express";
import authorizeToken from "../middleware/authorizetoken.middleware.js";

const router = express.Router();

import {
  getProfile,
  editProfile,
  getProfileCourses,
  getProfileFavorites,
  getProfileCompleted,
} from "../controllers/profile.controller.js";

router.use(authorizeToken);
//User profile endpoints
router.get("", getProfile);
router.put("/edit", editProfile);
router.get("/enrolled", getProfileCourses);
router.get("/favourites", getProfileFavorites);
router.get("/completed", getProfileCompleted);
export default router;
