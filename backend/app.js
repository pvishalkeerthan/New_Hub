import "dotenv/config";
import express from "express";
import authRoute from "./routes/authentication.route.js";
import courseRoute from "./routes/course.route.js";
import enrollRoute from "./routes/enrollment.route.js";
import profileRoute from "./routes/profile.route.js";
import reviewRoute from "./routes/review.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
//const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));

app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoute);
app.use("/api/profile", profileRoute);
app.use("/api/enrollments", enrollRoute);
app.use("/api/reviews", reviewRoute);

mongoose.connect(process.env.MONGODB_URL);
app.listen(9000, () => {
  console.log(`Listening to 9000`);
});

app.get("/", (req, res) => {
  res.send("welcome to home");
});
