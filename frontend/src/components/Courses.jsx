import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-container">
      <h1 className="courses-title">Courses</h1>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img
              className="course-image"
              src={course.image}
              alt={course.title}
            />
            <div className="course-details">
              <h2 className="course-title">{course.title}</h2>
              <p className="course-description">{course.description}</p>
              <Link to={`/courses/${course._id}`} className="know-more-link">
                {"Know More"} &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
