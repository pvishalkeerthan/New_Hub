import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

// CourseSchema.statics.sampleData = () => ({
//   title: "Sample Course",
//   description: "This is a sample course description.",
//   category: "Programming",
//   duration: 30,
//   level: "beginner",
//   price: 0,
//   image: "https://example.com/sample.jpg",
//   reviews: [], // Add review IDs if needed
//   enrolledStudents: [], // Add student IDs if needed
// });

export default mongoose.model("Course", CourseSchema);
