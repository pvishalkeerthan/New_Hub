import React from 'react';
import '../App.css'; // Import custom CSS for additional styling
import { Container, Row, Col, Card } from 'react-bootstrap'; // Import Bootstrap components

function About() {
  const teamMembers = [
    {
      name: 'John Doe',
      position: 'Co-Founder & CEO',
      bio:
        'John is an experienced entrepreneur with a background in business management and strategic planning. He co-founded our company with a vision to revolutionize the industry.',
    },
    {
      name: 'Jane Smith',
      position: 'Chief Technology Officer',
      bio:
        'Jane is a seasoned technologist with over 15 years of experience in software development and IT management. She leads our technical team and drives innovation.',
    },
    {
      name: 'Michael Brown',
      position: 'Chief Marketing Officer',
      bio:
        'Michael brings a wealth of marketing expertise to our team. With a background in digital marketing and brand strategy, he oversees our marketing initiatives and client relations.',
    },
    {
      name: 'Emily Davis',
      position: 'Chief Financial Officer',
      bio: 'Emily is a finance professional with extensive experience in financial planning and analysis. She manages our company’s financial strategy and operations.',
    },
    {
      name: 'David Wilson',
      position: 'Chief Operating Officer',
      bio: 'David has a strong operational background with expertise in optimizing business processes. He ensures smooth operations and efficient resource allocation.',
    },
    {
      name: 'Sophia Lee',
      position: 'Chief Product Officer',
      bio: 'Sophia is a product development expert with a passion for creating innovative solutions. She leads our product strategy and drives product development efforts.',
    },
  ];

  return (
    <div className="about">
      <Container>
        <div className="about-header text-center">
          <h1>About Us</h1>
          <p>
            LearnHub aims to revolutionize online education and make learning more engaging, accesible nad impactful for learners for learners of all ages and backgrounds
          </p>
        </div>

        <Row className="team-members">
          {teamMembers.map((member, index) => (
            <Col key={index} xs={12} md={4} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Body>
                  <Card.Title className="text-center">{member.name}</Card.Title>
                  <Card.Subtitle className="text-center mb-3">{member.position}</Card.Subtitle>
                  <Card.Text>{member.bio}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default About;
