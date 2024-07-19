import express from "express";
const router = express.Router();
import {
  getCourse,
  getCourseById,
  getCourseByCriteria,
} from "../controllers/course.controller.js";

router.get("/", getCourse);
router.get("/search", getCourseByCriteria);
router.get("/:id", getCourseById);

export default router;
