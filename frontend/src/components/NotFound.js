import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AccessDeniedPage = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-danger">Access Denied</Card.Title>
              <Card.Text>
                <p className="mb-0">
                  Oops! You don't have permission to access this page.
                </p>
                <p>Please contact the administrator for assistance.</p>
              </Card.Text>
              <Link to="/">
                <Button variant="primary" className="mt-3">
                  Go Back
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessDeniedPage;
