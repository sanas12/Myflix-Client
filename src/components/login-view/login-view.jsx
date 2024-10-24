import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://myflix-app-s99e.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("token", response.token);
          onLoggedIn(response.user, response.token);
        } else {
          alert("Login failed");
        }
      });
  };
  return (
    <Container fluid className="login-view p-0">
      <div className="login-background vh-100">
        <Row className="justify-content-center align-items-center h-100  m-0">
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <div className="login-card">
              <div className="login-card-header">
                <h1 className="login-title">MoviesFlix-Hub</h1>
                <p className="login-subtitle">Sign in to your account</p>
              </div>
              <div className="login-card-body">
                <Form onSubmit={handleSubmit} method="POST">
                  <Form.Group controlId="formUsername" className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text login-input-icon">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                        className="login-input"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text login-input-icon">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                      />
                    </div>
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      className="login-button"
                    >
                      Sign In
                    </Button>
                  </div>
                </Form>
              </div>
              <div className="login-card-footer">
                <span className="signup-text">New to MyFlix-Hub?</span>{" "}
                <Link to="/signup" className="signup-link">
                  Create an account
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
