import User from "../models/User.model.js";
import Course from "../models/Course.model.js";

export async function getProfile(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function editProfile(req, res) {
  try {
    const userId = req.userId;
    await User.findByIdAndUpdate(userId, req.body);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function getProfileCourses(req, res) {
  try {
    const userId = req.userId;
    console.log(userId);
    const user = await User.findById(userId);
    const userCourses = await Course.find({
      _id: { $in: user.enrolledCourses },
    });
    res.status(200).json({ courses: userCourses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function getProfileFavorites(req, res) {
  try {
    const userId = req.userId;
    console.log(userId);
    const user = await User.findById(userId);
    const userFavorites = await Course.find({
      _id: { $in: user.favouriteCourses },
    });
    res.status(200).json({ favourites: userFavorites });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function getProfileCompleted(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const completedCourses = await Course.find({
      _id: { $in: user.completedCourses },
    });

    res.status(200).json({ completed: completedCourses });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
