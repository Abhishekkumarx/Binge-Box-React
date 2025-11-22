import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import MovieSlider from './components/MovieSlider';
import Poster from './components/Poster';
import { useEffect, useState } from 'react';

const [getMovies,setGetMovies] = useState("");

const apiKey= '875daaf7';
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


function App() {

  return (
    <>
    <Header/>
    <Footer/>
    </>
  )
}

export default App
