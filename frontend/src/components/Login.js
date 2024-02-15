import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.formEmail.value;
    const password = e.target.elements.formPassword.value;

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the authentication token is present in data.token
        const authToken = data.userLoggedIn.token;

        //store token in cookie
        document.cookie = `access_token=${authToken}`;

        console.log("Success:", data);

        // Redirect to the dashboard
        navigate("/dashboard");

      } else {
        console.error("Error:", data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error.message || "Login failed");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4 display-4">
                Login
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label className="font-weight-bold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className="font-weight-bold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="btn-block mt-4"
                >
                  Login
                </Button>

                <div className="mt-3 text-center">
                  Don't have an account?{" "}
                  <Button href="/" variant="link">
                    Register
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
