import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function User() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/profile', {
          withCredentials: true,
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        logout(); // Log out the user if there's an error
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/profile/enrolled', {
          withCredentials: true,
        });
        setEnrolledCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    fetchUser();
    fetchEnrolledCourses();
  }, [logout]);

  const handleUnenroll = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/enrollments/${courseId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // Update enrolled courses list after successful unenrollment
        const updatedCourses = enrolledCourses.filter(course => course._id !== courseId);
        setEnrolledCourses(updatedCourses);
      }
    } catch (error) {
      console.error('Error unenrolling course:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-center">No user data available.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm p-3 mb-5 bg-body rounded">
            <Card.Body>
              <h2 className="text-center mb-4">User Profile</h2>
              <div className="mb-3">
                <strong>Name:</strong> {user.username}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {user.email}
              </div>
              {enrolledCourses && enrolledCourses.length > 0 ? (
                <>
                  <h3 className="mb-3">Enrolled Courses</h3>
                  {enrolledCourses.map(course => (
                    <div key={course._id} className="mb-3">
                      <p className="mb-1"><strong>Title:</strong> {course.title}</p>
                      <p className="mb-1"><strong>Description:</strong> {course.description}</p>
                      <Button variant="danger" size="sm" onClick={() => handleUnenroll(course._id)}>
                        Unenroll
                      </Button>
                      <hr className="my-1" />
                    </div>
                  ))}
                </>
              ) : (
                <p>No enrolled courses found.</p>
              )}
              <Button variant="secondary" className="float-end mt-3" onClick={handleLogout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default User;
