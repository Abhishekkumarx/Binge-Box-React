import './App.css'
import {useState ,useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Series from "./pages/Series";
import { Routes, Route } from "react-router-dom";
import Movies from './pages/Movies';
import { useNavigate } from "react-router-dom";
import MovieDetails from './pages/MovieDetails';
import AboutUs from './pages/AboutUs';


const apiKey = "875daaf7";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //const location = useLocation();
  const navigate = useNavigate();
  // Always go to Home after refresh




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

useEffect(() => {
  fetchResults("thor", "all");   // Default content when app starts
}, []);
useEffect(() => {
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    navigate("/");
  }
}, []);






  return (
    <>
      <Header onSearch={fetchResults} />

      <Routes>
        <Route
          path="/"
          element={<Home results={results} loading={loading} error={error} fetchResults={fetchResults} />}
        />
        <Route
          path="/series"
          element={<Series results={results} loading={loading} error={error} fetchResults={fetchResults} />}
        />
        <Route
          path="/movies"
          element={<Movies results={results} loading={loading} error={error} fetchResults={fetchResults} />}
        />
        <Route
          path="/about" element={<AboutUs />}/>
        

        <Route path="/movie/:id" element={<MovieDetails />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
