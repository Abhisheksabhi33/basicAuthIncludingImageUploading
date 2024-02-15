import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const userFirstname = e.target.elements.formUserFirstname.value;
    const userLastname = e.target.elements.formUserLastname.value;
    const email = e.target.elements.formEmail.value;
    const password = e.target.elements.formPassword.value;

    // console.log(userFirstname);
    // console.log(userLastname);
    // console.log(email);
    // console.log(password);

    try {
      fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userFirstname,
          lastName: userLastname,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4 display-4">
                Register
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUserFirstname">
                  <Form.Label className="font-weight-bold">
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your First Name"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formUserLastname">
                  <Form.Label className="font-weight-bold">
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Last Name"
                    required
                  />
                </Form.Group>

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
                  Register
                </Button>

                <div className="mt-3 text-center">
                  Already have an account?{" "}
                  <Button href="/login" variant="link">
                    Login
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
