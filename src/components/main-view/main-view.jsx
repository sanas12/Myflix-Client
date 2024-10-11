import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view"; // Import ProfileView
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Form from "react-bootstrap/Form";
import "./main-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-app-s99e.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetch("https://myflix-app-s99e.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        return response.json();
      })
      .then((user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [token]);

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("favorites");
  };

  const handleFavorite = (movieId) => {
    const isFavorite = user.FavoriteMovies.includes(movieId);
    const url = `https://myflix-app-s99e.onrender.com/users/${user.Username}/movies/${movieId}`;
    const method = isFavorite ? "DELETE" : "POST";

    fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to ${isFavorite ? "remove" : "add"} favorite`
          );
        }
        return response.json();
      })
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((error) => {
        console.error(
          `Error ${isFavorite ? "removing" : "adding"} favorite:`,
          error
        );
      });
  };

  // Filter the movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      <Container>
        <NavigationBar
          user={user}
          onLoggedOut={handleLogout}
          onSearch={setSearchQuery} // Set searchQuery state directly
        />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                !user ? (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/login"
              element={
                !user ? (
                  <Col md={5}>
                    <LoginView onLoggedIn={handleLogin} />
                  </Col>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    onLoggedOut={handleLogout}
                    onFavorite={handleFavorite}
                  />
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      onFavorite={handleFavorite}
                    />
                  </Col>
                )
              }
            />
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <>
                    {/* Display the filtered movies */}
                    {filteredMovies.length > 0 ? (
                      filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                          <MovieCard
                            movie={movie}
                            isFavorite={user.FavoriteMovies.includes(movie._id)}
                            onFavorite={handleFavorite} // Pass the handleFavorite function
                          />
                        </Col>
                      ))
                    ) : (
                      <div>No movies found.</div>
                    )}
                  </>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
