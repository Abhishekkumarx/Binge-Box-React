// src/pages/Home.jsx
import React, { useState } from "react";
import MovieCard from "../components/MovieCard";

/**
 * Home.jsx
 * - Pure UI layout for the home page
 * - Shows section title
 * - Shows search input
 * - Shows responsive movie grid
 * 
 * Next step: connect real API data.
 */

export default function Home() {
  // UI-only temporary movies (replace with real OMDb fetch later)
  const [movies, setMovies] = useState([
    {
      imdbID: "tt4154796",
      Title: "Avengers: Endgame",
      Year: "2019",
      Poster: "https://m.media-amazon.com/images/M/MV5B...jpg",
    },
    {
      imdbID: "tt0468569",
      Title: "The Dark Knight",
      Year: "2008",
      Poster: "https://m.media-amazon.com/images/M/MV5B...jpg",
    },
    {
      imdbID: "tt0944947",
      Title: "Game of Thrones",
      Year: "2011–2019",
      Poster: "https://m.media-amazon.com/images/M/MV5B...jpg",
    },
  ]);

  return (
    <div className="flex flex-col gap-8">
      
      {/* Section Heading */}
      <h1 className="text-3xl font-bold">Popular Movies & Series</h1>

      {/* Search Bar */}
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search movies or series..."
          className="w-full sm:w-1/2 bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none border border-gray-700"
        />
      </div>

      {/* Movie Grid */}
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          gap-6
        "
      >
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
