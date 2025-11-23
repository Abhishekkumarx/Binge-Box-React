// Home.jsx
import React from "react";
import MovieCard from "../components/MovieCard";

export default function Home({ results, loading, error }) {
  
  // Separate movies and series
  const movies = results.filter((item) => item.Type === "movie");
  const series = results.filter((item) => item.Type === "series");

  return (
    <div className="flex flex-col gap-12 pt-24">

      <h1 className="text-3xl font-bold">Popular Movies & Series</h1>

      {/* Loading */}
      {loading && <div className="text-gray-400 text-lg">Loading...</div>}

      {/* Error */}
      {error && <div className="text-red-400 text-lg">{error}</div>}

      {/* --- MOVIES SECTION --- */}
      {!loading && !error && movies.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Movies</h2>

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
      )}

      {/* --- SERIES SECTION --- */}
      {!loading && !error && series.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Series</h2>

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
            {series.map((item) => (
              <MovieCard key={item.imdbID} movie={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
