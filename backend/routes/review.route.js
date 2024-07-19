import express from "express";
import authorizeToken from "../middleware/authorizetoken.middleware.js";

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByCourseId,
} from "../controllers/review.controller.js";

router.use(authorizeToken);
router.post("", addReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/course/:courseId", getReviewsByCourseId);
export default router;
