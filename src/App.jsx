import './App.css'
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Series from "./pages/Series";
import { Routes, Route } from "react-router-dom";
import Movies from './pages/Movies';

const apiKey = "875daaf7";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // GLOBAL FETCH FUNCTION (will be used by Home + Series)
 // fetch movies + series depending on page
const fetchResults = async (query, type) => {
  if (!query) return;

  setLoading(true);
  setError("");
  let finalResults = [];

  try {
    // Fetch Movies
    if (type === "movie" || type === "all") {
      const movieURL = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`;
      const movieRes = await fetch(movieURL);
      const movieData = await movieRes.json();
      if (movieData.Response === "True") {
        finalResults = [...finalResults, ...movieData.Search];
      }
    }

    // Fetch Series
    if (type === "series" || type === "all") {
      const seriesURL = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=series`;
      const seriesRes = await fetch(seriesURL);
      const seriesData = await seriesRes.json();
      if (seriesData.Response === "True") {
        finalResults = [...finalResults, ...seriesData.Search];
      }
    }

    if (finalResults.length === 0) {
      setError("No Results Found!");
    }

    setResults(finalResults);
  } catch (err) {
    setError("Error loading results.",err);
  }

  setLoading(false);
};



  return (
    <>
      <Header onSearch={fetchResults} />

      <Routes>
        <Route
          path="/"
          element={<Home results={results} loading={loading} error={error} />}
        />
        <Route
          path="/series"
          element={<Series results={results} loading={loading} error={error} />}
        />
        <Route
          path="/movies"
          element={<Movies results={results} loading={loading} error={error} />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
