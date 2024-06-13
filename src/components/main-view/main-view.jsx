import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "The Shawshank Redemption",
      Description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Genre: {
        Name: "Drama",
        Description:
          "A genre that focuses on serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
      },
      Director: {
        Name: "Frank Darabont",
        Bio: "Frank Darabont is a Hungarian-American film director, screenwriter, and producer who has been nominated for three Academy Awards and a Golden Globe.",
        Birth: "January 28, 1959",
      },
      ImagePath: "https://m.media-amazon.com/images/I/91E-7Zj48BL._SY606_.jpg",
      Featured: false,
    },
    {
      id: 2,
      Title: "The Godfather",
      Description:
        "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
      Genre: {
        Name: "Crime",
        Description:
          "A genre that focuses on criminal activities or the criminal lifestyle.",
      },
      Director: {
        Name: "Francis Ford Coppola",
        Bio: "Francis Ford Coppola is an American film director, producer, and screenwriter who was a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s.",
        Birth: "April 7, 1939",
      },
      ImagePath:
        "https://eportfolios.macaulay.cuny.edu/seminars/drabik09/images/4/4d/Godfather.jpg",
      Featured: false,
    },
    {
      Title: "Inception",
      Description:
        "A thief who enters the dreams of others to steal their secrets from their subconscious.",
      Genre: {
        Name: "Science Fiction",
        Description:
          "A genre that explores imaginative concepts that are largely based on speculative scientific discoveries, phenomena, or events.",
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Nolan is a British-American film director, producer, and screenwriter known for his distinctive style and innovative approach to filmmaking.",
        Birth: "July 30, 1970",
      },
      ImagePath:
        "https://www.bambikino.de/wp-content/uploads/2024/01/Psyche-Inception-pl.jpg",
    },
    {
      id: 3,
      Title: "The Dark Knight",
      Description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      Genre: {
        Name: "Action",
        Description:
          "A genre characterized by strong violence, fighting, and intense physical activity.",
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Nolan is a British-American film director, producer, and screenwriter known for his distinctive style and innovative approach to filmmaking.",
        Birth: "July 30, 1970",
      },
      ImagePath:
        "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
      Featured: true,
    },
    {
      id: 4,
      Title: "Forrest Gump",
      Description:
        "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
      Genre: {
        Name: "Drama",
        Description:
          "A genre that focuses on serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
      },
      Director: {
        Name: "Robert Zemeckis",
        Bio: "Robert Zemeckis is an American film director, producer, and screenwriter known for his work in various genres, including comedy, science fiction, and drama.",
        Birth: "May 14, 1952",
      },
      ImagePath:
        "https://upload.wikimedia.org/wikipedia/vi/1/1d/Forrest_gump.jpg?20210321014741",
      Featured: false,
    },
    {
      id: 5,
      Title: "Pulp Fiction",
      Description:
        "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      Genre: {
        Name: "Crime",
        Description:
          "A genre that focuses on criminal activities or the criminal lifestyle.",
      },
      Director: {
        Name: "Quentin Tarantino",
        Bio: "Quentin Tarantino is an American film director, screenwriter, producer, and actor known for his nonlinear storylines, satirical subject matter, and aestheticization of violence.",
        Birth: "March 27, 1963",
      },
      ImagePath:
        "https://cdn.europosters.eu/image/750/posters/pulp-fiction-cover-i1288.jpg",
      Featured: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};
