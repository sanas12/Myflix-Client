// src/components/movie-view/movie-view.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, onFavorite }) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  return (
    <Card className="mt-4">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <Link to={`/`}>
          <Button className="mt-2">Back</Button>
        </Link>
        <Button
          variant={
            user.FavoriteMovies.includes(movie.id) ? "danger" : "primary"
          }
          onClick={() => onFavorite(movie.id)}
          className="mt-2 ms-2"
        >
          {user.FavoriteMovies.includes(movie.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};
