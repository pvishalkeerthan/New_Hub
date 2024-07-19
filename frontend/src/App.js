import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/home.jsx";
import About from "./components/About.jsx";
import Login from "./components/login.jsx";
import Register from "./components/Register.jsx";
import Footer from "./components/Footer.jsx";
import Courses from "./components/Courses.jsx";
import User from "./components/User";
import CourseDetail from "./components/CourseDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-container">
          {" "}
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<User />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
