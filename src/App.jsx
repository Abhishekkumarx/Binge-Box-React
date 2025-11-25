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
import TermsAndConditions from './pages/TermsAndConditions';


const apiKey = "875daaf7";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);

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


useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);



  return (
    <>
     <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[--color-bg-light] dark:bg-[--color-bg-dark] text-[--color-text-light] dark:text-[--color-text-dark]">
      <Header onSearch={fetchResults} darkMode={darkMode} setDarkMode={setDarkMode} />


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
        <Route path="/terms" element={<TermsAndConditions/>} />
      </Routes>

      <Footer />
    </div>
    </div>
    </>
  );
}

export default App;
