import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Col, Row, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    <Card className="mt-4">
      <Card.Body>
        <Row>
          <Col md={6}>
            <h2>User Profile</h2>
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBirthDate" className="mb-3">
                <Form.Label>Birth Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="me-2">
                Update Profile
              </Button>
              <Button variant="danger" onClick={handleDeregister}>
                Delete Account
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <h2>Favorite Movies</h2>
            {favoriteMovies.length === 0 ? (
              <div>No favorite movies</div>
            ) : (
              <Row>
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
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
