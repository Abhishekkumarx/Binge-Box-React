// src/components/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";


export default function MovieCard({ movie }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/310x460.png?text=No+Image";

  return (
    <Link to={`/movie/${movie.imdbID}`} className="group">
      <div
        className="
          bg-[#0f1724] 
          rounded-xl 
          overflow-hidden 
          shadow-lg 
          transform 
          group-hover:-translate-y-1 
          transition-all 
          duration-200
        "
      >
        {/* Poster */}
        <img
          src={poster}
          alt={movie.Title}
          className="w-full h-64 object-cover group-hover:opacity-90 transition"
        />

        {/* Text */}
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2">{movie.Title}</h3>
          <p className="text-xs text-gray-400 mt-1">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
}
