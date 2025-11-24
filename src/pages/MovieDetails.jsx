import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Modal from "react-modal";

const apiKey = "875daaf7";

Modal.setAppElement("#root");

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trailerId, setTrailerId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openTrailer = () => setIsOpen(true);
  const closeTrailer = () => setIsOpen(false);

  const fetchMovieDetails = async () => {
    try {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovie(data);
        searchYouTubeTrailer(data.Title + " Trailer");
      } else {
        setError("Movie details not found!");
      }
    } catch (err) {
      setError("Failed to load movie details.");
    }
    setLoading(false);
  };

  const searchYouTubeTrailer = async (query) => {
    const searchURL =
      "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);

    const res = await fetch(searchURL);
    const text = await res.text();

    // Extract first YouTube video ID
    const match = text.match(/"videoId":"(.*?)"/);
    if (match) setTrailerId(match[1]);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-white pt-24 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 pt-24 text-xl">{error}</div>;
  }

  return (
    <div className="relative pt-24 text-white">

      {/* BACKGROUND */}
      <div
        className="absolute top-0 left-0 w-full h-[60vh] bg-cover bg-center opacity-30 blur-xl"
        style={{ backgroundImage: `url(${movie.Poster})` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-black via-transparent to-black"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
        
        {/* POSTER */}
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-64 md:w-80 rounded-lg shadow-xl"
        />

        {/* DETAILS */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{movie.Title}</h1>
          <p className="text-gray-300">{movie.Year} • {movie.Runtime}</p>

          {/* GENRES */}
          <div className="flex flex-wrap gap-2">
            {movie.Genre.split(", ").map((g, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-600 text-white text-xs rounded-full"
              >
                {g}
              </span>
            ))}
          </div>

          {/* RATING */}
          <p className="text-yellow-400 text-xl">⭐ IMDb: {movie.imdbRating}</p>

          {/* PLOT */}
          <p className="text-gray-300 text-lg leading-relaxed">{movie.Plot}</p>

          {/* CAST + DIRECTOR */}
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Director:</strong> {movie.Director}</p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700">
              ▶ Watch Now
            </button>

            <button
              onClick={openTrailer}
              className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              🎥 Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* TRAILER MODAL */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeTrailer}
        className="bg-black rounded-lg shadow-xl w-[90%] md:w-[60%] mx-auto mt-24 p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
      >
        <button
          onClick={closeTrailer}
          className="text-white text-right w-full text-2xl mb-2"
        >
          ✖
        </button>

        {trailerId ? (
          <YouTube
            videoId={trailerId}
            opts={{
              width: "100%",
              playerVars: { autoplay: 1 },
            }}
          />
        ) : (
          <p className="text-white text-center">No trailer found.</p>
        )}
      </Modal>
    </div>
  );
}
