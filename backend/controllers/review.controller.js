import Review from "../models/Review.model.js";

export async function addReview(req, res) {
  try {
    const { courseId, rating, comment } = req.body;
    const review = new Review({
      user: req.userId,
      course: courseId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).send(review);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(e);
  }
}
export async function updateReview(req, res) {
  try {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;
    await Review.findByIdAndUpdate(reviewId, { rating, comment });
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function deleteReview(req, res) {
  try {
    const reviewId = req.params.id;
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getReviewsByCourseId(req, res) {
  try {
    const { courseId } = req.params;
    const reviews = await Review.find({ course: courseId }).populate("user", "username");
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
}