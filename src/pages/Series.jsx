import React, { useState } from "react";
import MovieCard from "../components/MovieCard";


const apiKey= '875daaf7';

export default function Series() {

  const [movies,setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (name) => {
    if(!name) return;
    setLoading(true);
    setError("");
    try {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${name}&type=Series`;
      const response= await fetch(url);
      const data = await response.json();
      if(data.Response === 'True'){
        setMovies(data.Search);
      }else{
        setMovies([]);
        setError("No  Movies Found!!!");
      }
    } catch (error) {
      console.log("Failed to fetch movie data :",error);
      
    }
    setLoading(false);

  }


// useEffect(() => {
//   fetchMovies("thor");
// },[]);

const handleSearch = (e) => {
  e.preventDefault();
  if(searchText.trim()!=="") fetchMovies(searchText);
};

  

  return (
    <div className="flex flex-col gap-8">
      
      <h1 className="text-3xl font-bold">Popular Movies & Series</h1>

      <form onSubmit={handleSearch} className="w-full flex justify-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search movies or series..."
          className="w-full sm:w-1/2 bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none border border-gray-700"
        />
      </form>

      {loading && (
        <div className="text-center text-gray-400 text-lg">Loading...</div>
      )}

      {error && (
        <div className="text-center text-red-400 text-lg">{error}</div>
      )}

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
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );

};