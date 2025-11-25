import React, { useEffect,useState } from "react";
import MovieCard from "../components/MovieCard";

export default function Home({ results, loading, error, fetchResults , trending}) {
  
  const movies = results.filter((item) => item.Type === "movie");
  const series = results.filter((item) => item.Type === "series");
  const [activeIndex, setActiveIndex] = useState(0);
  const [pauseSlider, setPauseSlider] = useState(false);

  useEffect(() => {
  fetchResults("thor", "all"); 
}, []);

const slideTrending = (distance) => {
  const slider = document.getElementById("trending-slider");
  if (slider) slider.scrollLeft += distance;
};

useEffect(() => {
  if (pauseSlider) return; 
  const interval = setInterval(() => {
    const slider = document.getElementById("trending-slider");
    if (!slider) return;

    const cardWidth = 200; 
    slider.scrollLeft += cardWidth;

    setActiveIndex((prev) =>
      prev + 1 >= trending.length ? 0 : prev + 1
    );

    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollLeft = 0;
    }
  }, 3000); 

  return () => clearInterval(interval);
}, [trending, pauseSlider]);


  return (
    <div className="flex flex-col gap-12 pt-24 bg-[--bg-light] dark:bg-[--bg-dark] text-[--text-light] dark:text-[--text-dark]">




      
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-4 self-center text-center">Trending Movies</h2>

  <div className="relative group">

    <div
      id="trending-slider"
      className="flex overflow-x-scroll no-scrollbar scroll-smooth space-x-4"
      onMouseEnter={() => setPauseSlider(true)}
      onMouseLeave={() => setPauseSlider(false)}
    >
      {trending.map((movie, index) => (
        <div key={movie.imdbID} className="min-w-[180px]">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-56 object-cover rounded-lg"
          />
          <p className="mt-1 text-center">{movie.Title}</p>
        </div>
      ))}
    </div>

    <button
      onClick={() => slideTrending(-300)}
      className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
    >
      ◀
    </button>

    <button
      onClick={() => slideTrending(300)}
      className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full opacity-0 group-hover:opacity-100 transition"
    >
      ▶
    </button>

    
  </div>
</div>




      {loading && <div className="text-gray-400 text-lg text-center">Loading...</div>}

      {error && <div className="text-red-400 text-lg">{error}</div>}

      {!loading && !error && movies.length > 0 && (
        <div>
        

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
