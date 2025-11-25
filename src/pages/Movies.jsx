// Movies.jsx
import React from "react";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function Movies({ results, loading, error, fetchResults }) {

  // FILTER ONLY MOVIES
  const movies = results.filter(item => item.Type === "movie");
  useEffect(() => {
  fetchResults("singham", "movie");  
}, []);


  return (
    <div className="flex flex-col gap-12 pt-24 bg-[--bg-light] dark:bg-[--bg-dark] text-[--text-light] dark:text-[--text-dark]">


      
      <h1 className="text-3xl font-bold self-center">Popular Movies</h1>

      {loading && <div className="text-gray-400 text-lg">Loading...</div>}
      {error && <div className="text-red-400 text-lg">{error}</div>}

      {!loading && !error && movies.length > 0 && (
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
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="text-gray-400 text-center">No movie results found.</p>
      )}
    </div>
  );
}
