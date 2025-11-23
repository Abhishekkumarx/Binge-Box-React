// Series.jsx
import React from "react";
import { useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function Series({ results, loading, error, fetchResults }){
useEffect(() => {
  fetchResults("money heist", "series");  
}, []);


  return (
    <div className="flex flex-col gap-8 pt-24">
      <h1 className="text-3xl font-bold">Popular Series</h1>

      {loading && <div className="text-gray-400 text-lg">Loading...</div>}
      {error && <div className="text-red-400 text-lg">{error}</div>}

      {!loading && !error && (
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
          {results.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
