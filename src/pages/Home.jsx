// src/pages/Home.jsx
import React, { useState,useEffect } from "react";
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
const apiKey= '875daaf7';

export default function Home() {

  const [movies,setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMovie(name) {
    try {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${name}`;
      const response= await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch movie data :",error);
      
    }

  
}

useEffect(()=>{
  fetchMovie("thor");
},[]);

  // UI-only temporary movies (replace with real OMDb fetch later)
  

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
