// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Modal from "react-modal";

const OMDB_API_KEY = "875daaf7";
const YOUTUBE_API_KEY = ""; 

Modal.setAppElement("#root");

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trailerId, setTrailerId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchingTrailer, setSearchingTrailer] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  async function fetchMovieDetails() {
    setLoading(true);
    setError("");
    try {
      const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError("Movie details not found.");
      }
    } catch (err) {
      setError("Failed to load movie details.",err);
    } finally {
      setLoading(false);
    }
  }

  async function findTrailerVideoId(title) {
    if (!title) return null;

    if (YOUTUBE_API_KEY && YOUTUBE_API_KEY.trim() !== "") {
      try {
        const q = encodeURIComponent(`${title} trailer`);
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${q}&key=${YOUTUBE_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) {
          console.warn("YouTube API request failed:", res.status);
          return null;
        }
        const json = await res.json();
        if (json.items && json.items.length > 0 && json.items[0].id && json.items[0].id.videoId) {
          return json.items[0].id.videoId;
        }
        return null;
      } catch (err) {
        console.warn("YouTube API error:", err);
        return null;
      }
    }
    return null;
  }

  async function onOpenTrailer() {
    if (!movie) return;

    setSearchingTrailer(true);
    const idFound = await findTrailerVideoId(movie.Title);
    setSearchingTrailer(false);

    if (idFound) {
      setTrailerId(idFound);
      setIsOpen(true);
    } else {
      const q = encodeURIComponent(`${movie.Title} trailer`);
      window.open(`https://www.youtube.com/results?search_query=${q}`, "_blank");
      setTrailerId(null);
      setIsOpen(false);
    }
  }

  function closeTrailer() {
    setIsOpen(false);
  }

  if (loading) {
    return <div className="text-center text-white pt-24 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 pt-24 text-xl">{error}</div>;
  }

  if (!movie) return null;

  return (
    <div className="pt-24 p-6 bg-white dark:bg-black text-black dark:text-white">

      <div
        className="absolute top-0 left-0 w-full h-[60vh] bg-cover bg-center opacity-30 blur-xl"
        style={{ backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : ""})` }}
      />
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">

        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-64 md:w-80 rounded-lg shadow-xl"
        />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{movie.Title}</h1>
          <p className="text-gray-300">{movie.Year} • {movie.Rated} • {movie.Runtime}</p>

          <div className="flex flex-wrap gap-2">
            {(movie.Genre || "").split(", ").map((g, i) => (
              <span key={i} className="px-3 py-1 bg-red-600 text-white text-xs rounded-full">{g}</span>
            ))}
          </div>

          <p className="text-yellow-400 text-xl">⭐ IMDb: {movie.imdbRating}</p>

          <p className="text-gray-300 text-lg leading-relaxed">{movie.Plot}</p>

          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Writer:</strong> {movie.Writer}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onOpenTrailer}
              className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              {searchingTrailer ? "Searching..." : "🎥 Watch Trailer"}
            </button>
            {/* <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.Title + " trailer")}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-transparent border border-gray-600 rounded-lg"
            >
              🔎 Open YouTube Search
            </a> */}
          </div>
        </div>
      </div>

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
          <div className="text-center text-white">
            <p>No trailer found to embed. We opened a YouTube search in a new tab.</p>
            <p className="mt-2 text-sm text-gray-400">If you want embedded trailers, add a YouTube Data API key in <code>YOUTUBE_API_KEY</code>.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
