import User from "../models/User.model.js";
import Course from "../models/Course.model.js";

export async function enrollCourse(req, res) {
  try {
    const userId = req.userId;
    const courseId = req.params.id;
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId },
    });

    res.status(200).json({ message: "Enrolled successfully" });
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e);
  }
}

export async function unEnrollCourse(req, res) {
  try {
    const userId = req.userId;
    const courseId = req.params.id;
    await User.findByIdAndUpdate(userId, {
      $pull: { enrolledCourses: courseId },
    });
    await Course.findByIdAndUpdate(courseId, {
      $pull: { enrolledStudents: userId },
    });
    res.status(200).json({ message: "Unenrolled successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
