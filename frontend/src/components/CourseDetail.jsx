import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FaBook, FaClock, FaLevelUpAlt, FaDollarSign, FaStar } from 'react-icons/fa';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [message, setMessage] = useState("");
  const [showReviewSection, setShowReviewSection] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0); // State to store the selected rating
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/courses/${courseId}`);
        setCourse(response.data);
        checkEnrollment(response.data);
        fetchReviews();
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const checkEnrollment = async (courseData) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/profile/enrolled`, {
        withCredentials: true
      });

      const enrolledCourses = response.data.courses.map(course => course._id);
      setIsEnrolled(enrolledCourses.includes(courseData._id));
    } catch (error) {
      console.error("Error checking enrollment:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/reviews/course/${courseId}`, {
        withCredentials: true
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleEnroll = async () => {
    try {
      const response = await axios.post(`http://localhost:9000/api/enrollments/${courseId}`, {}, {
        withCredentials: true
      });

      if (response.status === 200) {
        setIsEnrolled(true);
        setMessage("Course successfully enrolled!");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        setMessage("Failed to enroll in course. Please try again.");
      }
    }
  };

  const handleUnenroll = async () => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/enrollments/${courseId}`, {
        withCredentials: true
      });

      if (response.status === 200) {
        setIsEnrolled(false);
        setMessage("Course successfully unenrolled!");
      }
    } catch (error) {
      console.error("Error unenrolling course:", error);
      setMessage("Failed to unenroll from course. Please try again.");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/reviews`,
        { courseId, rating, comment: reviewText },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setMessage("Review submitted successfully!");
        setShowReviewSection(false);
        setReviewText("");
        setRating(0); // Reset rating after submission
        fetchReviews(); // Update reviews after submission
      } else {
        setMessage("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Failed to submit review. Please try again.");
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  if (!course) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="course-details">
            <h1 className="display-4 course-title">{course.title}</h1>
            <p className="lead course-info"><FaBook />&nbsp; Content Category: {course.category}</p>
            <p className="lead course-info"><FaClock />&nbsp; Course Duration: {course.duration} hours</p>
            <p className="lead course-info"><FaLevelUpAlt />&nbsp; Difficulty level: {course.level}</p>
            <p className="lead course-info"><FaDollarSign />&nbsp; Cost of Course: ${course.price}</p>
            <div className="d-flex justify-content-between align-items-center mb-3">
              {isEnrolled ? (
                <>
                  <div className="alert alert-success" role="alert">
                    Enrolled
                  </div>
                  <button
                    className="btn btn-danger btn-lg unenroll-button"
                    onClick={handleUnenroll}
                  >
                    Unenroll
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-warning btn-lg enroll-button"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </button>
              )}
            </div>
            {message && <div className="alert alert-info">{message}</div>}

            {/* Review Section */}
            {isEnrolled && !showReviewSection && (
              <div className="mt-4">
                <button className="btn btn-primary" onClick={() => setShowReviewSection(true)}>
                  Write a Review
                </button>
              </div>
            )}

            {showReviewSection && (
              <div className="mt-4">
                <h3>Write a Review</h3>
                <div className="mb-3">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FaStar
                        key={ratingValue}
                        className={ratingValue <= rating ? "star-selected" : "star-unselected"}
                        onClick={() => handleStarClick(ratingValue)}
                      />
                    );
                  })}
                </div>
                <textarea
                  className="form-control mb-2"
                  rows="4"
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
                <button className="btn btn-primary" onClick={handleReviewSubmit}>
                  Submit Review
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="course-image">
            <img src={course.image} className="img-fluid rounded" alt={course.title} />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="row mt-4">
        <div className="col">
          <div className="reviews">
            <h3>Reviews</h3>
            <div className="row">
              {reviews.length === 0 ? (
                <div className="col">
                  <p>No reviews yet.</p>
                </div>
              ) : (
                reviews.map(review => (
                  <div key={review._id} className="col-md-4 mb-4">
                    <div className="review card h-100 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title text-primary">{review.user.username}</h5>
                        <div className="d-flex mb-2">
                          {[...Array(review.rating)].map((_, index) => (
                            <FaStar key={index} className="star-selected" />
                          ))}
                        </div>
                        <p className="card-text">{review.comment}</p>
                      </div>
                      <div className="card-footer bg-transparent border-top-0">
                        <small className="text-muted float-right">
                          {new Date(review.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
