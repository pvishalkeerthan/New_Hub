import Course from "../models/Course.model.js";

export async function getCourse(req, res) {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
}

export async function getCourseById(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
}

export async function getCourseByCriteria(req, res) {
  try {
    let query = req.query.query;
    let results = await Course.find({ $text: { $search: query } });
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ message: "Criteria Error" });
  }
}
