import express from "express";
import authorizeToken from "../middleware/authorizetoken.middleware.js";

const router = express.Router();

import {
  enrollCourse,
  unEnrollCourse,
} from "../controllers/enrollment.controller.js";

router.use(authorizeToken);
router.post("/:id", enrollCourse);
router.delete("/:id", unEnrollCourse);
export default router;
