import mongoose from "mongoose";
const Userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  favouriteCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  completedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// Userschema.statics.sampleData = () => ({
//   username: "sampleUser",
//   email: "sample@example.com",
//   password:"$2b$10$egpvLhrT3Tx5bpStQ49JieOWZSMBUEe8Nd9u5ZnASJ/66T5yzEXE2",
//   profilePicture: "https://example.com/sample.jpg",
//   enrolledCourses: [], // Add course IDs if needed
//   favouriteCourses: [], // Add course IDs if needed
//   completedCourses: [], // Add course IDs if needed
// });

export default mongoose.model("User", Userschema);
