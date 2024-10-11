import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onFavorite, isFavorite }) => {
  return (
    <Card
      className="movie-card h-100 shadow-sm"
      style={{
        backgroundColor: "white",
        color: "#1A1A1A",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      }}
    >
      <Card.Img
        variant="top"
        src={movie.ImagePath}
        alt={movie.Title}
        className="card-img-top"
        style={{ height: "400px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text className="flex-grow-1">{movie.Description}</Card.Text>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          {/* Use Link around the Button for navigation */}
          <Link
            to={`/movies/${encodeURIComponent(movie._id)}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="link">Open</Button>
          </Link>

          <Button
            variant={isFavorite ? "danger" : "primary"}
            onClick={() => onFavorite(movie._id)}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
