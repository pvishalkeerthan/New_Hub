import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import HomeImage from "./home.jpg";

function Home() {
  const { authenticated } = useAuth();

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row mt-5 align-items-center">
          <div className="col-lg-6 text-center">
            <h1 className="display-4 mb-4 text-success">LEARN HUB</h1>
            <p className="text-dark">
              Welcome to our comprehensive Learning Platform for students.
            </p>
            <Link
              to={authenticated ? "/courses" : "/login"}
              className="btn btn-danger"
            >
              Getting Started
            </Link>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <img
              src={HomeImage}
              alt="Logo"
              className="img-fluid"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>

      <section className="categories mt-5 mb-3 pb-5">
        <div className="container categories_container">
          <div className="row">
            <div className="col-lg-6">
              <div className="categories_left">
                <h1>About Our Platform</h1>
                <p>
                  Our educational platform is dedicated to providing a
                  comprehensive learning experience for students of all ages.
                  Join our community of learners and educators today!
                </p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
            </div>
            <div class="col-lg-6 categories_right">
              <div class="row gx-3">
                <div class="col-sm-4">
                  <article class="category">
                    <h5>
                      <strong>Professional Development</strong>
                    </h5>
                    <p>
                      Advance your career with expert-led courses tailored to
                      your industry and skill level.
                    </p>
                  </article>
                </div>
                <div class="col-sm-4">
                  <article class="category">
                    <h5>
                      <strong>Personal Growth</strong>
                    </h5>
                    <p>
                      Unlock your potential with courses designed to enhance
                      your personal and professional life.
                    </p>
                  </article>
                </div>
                <div class="col-sm-4">
                  <article class="category">
                    <h5>
                      <strong>Academic Support</strong>
                    </h5>
                    <p>
                      Get ahead in school or university with comprehensive
                      courses and study materials.
                    </p>
                  </article>
                </div>
                <div class="col-sm-4">
                  <article class="category">
                    <h5>
                      <strong>Skill Enhancement</strong>
                    </h5>
                    <p>
                      Master new skills or refine existing ones with our diverse
                      range of practical courses.
                    </p>
                  </article>
                </div>
                <div class="col-sm-4">
                  <article class="category">
                    <h5>
                      <strong>Interactive Learning</strong>
                    </h5>
                    <p>
                      Engage in immersive learning through
                      interactive courses.
                    </p>
                  </article>
                </div>
                <div class="col-sm-4">
                  <article class="category">
                    <h5>
                      <strong>Expert Instruction</strong>
                    </h5>
                    <p>
                      Learn from industry experts who are
                      passionate about sharing their knowledge.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials mt-3 mb-5">
        <div className="container">
          <h2>What Our Students Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Sarah Johnson</h5>
                  <p className="card-text">
                    "I've been using Learn Hub for a few months now, and it's
                    been incredibly helpful in supplementing my studies. The
                    courses are well-structured and easy to follow. Highly
                    recommended!"
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Michael Chen</h5>
                  <p className="card-text">
                    "Learn Hub has been instrumental in my professional
                    development. The courses offered here cover a wide range of
                    topics, and the instructors are top-notch. I've gained
                    valuable skills that have helped me advance in my career."
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Emma Davis</h5>
                  <p className="card-text">
                    "As a high school student, Learn Hub has been a lifesaver
                    for me. The academic support provided here has helped me
                    improve my grades and gain a better understanding of
                    challenging subjects. Thank you, Learn Hub!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
