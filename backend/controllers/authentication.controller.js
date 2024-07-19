  import User from "../models/User.model.js";
  import jwt from "jsonwebtoken";
  import bcrypt from "bcrypt";

  export async function userSignUp(req, res) {
    try {
      const { username, email, password } = req.body;
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "Already exists" });
      }
      const hash = await bcrypt.hash(password, 10);
      const newuser = new User({ username, email, password: hash });
      newuser.save();
      return res.status(201).json({ message: "User created successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  export async function userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "100d",
      });
      res.cookie("jwt", token, { sameSite: "None", secure: true });
      res.status(200).json({ message: "Login successful", token });

    } catch (e) {
      res.status(500).json({ message: e.message });
      console.log(e.message);
    }
  }

  export function userLogout(req, res) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.status(200).json({ message: "Logout successful" });
  }
