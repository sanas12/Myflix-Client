import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendar,
  faLock,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./profile-view.scss";

export const ProfileView = ({
  user,
  movies,
  token,
  onLoggedOut,
  onFavorite, // Use this prop to handle favorites
}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthDate, setBirthDate] = useState(user.BirthDate);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    if (movies.length > 0) {
      const favorites = movies.filter((m) =>
        user.FavoriteMovies.includes(m._id)
      );
      setFavoriteMovies(favorites);
    }
  }, [movies, user.FavoriteMovies]);

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://myflix-app-s99e.onrender.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
        Email: email,
        BirthDate: birthDate,
      }),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        alert("Profile updated successfully");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        onLoggedOut();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleDeregister = () => {
    fetch(`https://myflix-app-s99e.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully");
          onLoggedOut();
          navigate("/signup");
        } else {
          alert("Failed to delete account");
        }
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  return (
    <Container className="profile-view">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header as="h2">
              <FontAwesomeIcon icon={faUser} /> Update Profile
            </Card.Header>
            <Card.Body>
              {feedbackMessage && (
                <Alert variant="info">{feedbackMessage}</Alert>
              )}
              <Form onSubmit={handleUpdate}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formUpdateUsername"
                >
                  <Form.Label column sm={2}>
                    <FontAwesomeIcon icon={faUser} /> Username
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      value={username}
                      readOnly
                      className="username-display"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formUpdatePassword"
                >
                  <Form.Label column sm={2}>
                    <FontAwesomeIcon icon={faLock} /> <br></br>Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength="4"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formUpdateEmail"
                >
                  <Form.Label column sm={2}>
                    <FontAwesomeIcon icon={faEnvelope} /> Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formUpdateBirthday"
                >
                  <Form.Label column sm={2}>
                    <FontAwesomeIcon icon={faCalendar} /> Birthday
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Button type="submit" className="w-100 mb-3 update-button">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Button
                variant="danger"
                className="w-100 delete-button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete your account?"
                    )
                  ) {
                    handleDelete();
                  }
                }}
              >
                Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header as="h3">
              <FontAwesomeIcon icon={faFilm} /> Favorite Movies
            </Card.Header>
            <Card.Body>
              <Row xs={1} md={2} lg={3} className="g-4">
                {favoriteMovies.map((movie) => (
                  <Col key={movie._id} md={6} lg={4} className="mb-4">
                    <MovieCard
                      movie={movie}
                      onFavorite={onFavorite}
                      isFavorite={user.FavoriteMovies.includes(movie._id)}
                    />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
