import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

const [getMovies,setGetMovies]= useState("");

const apiKey= '875daaf7';
async function getMovie(name) {
    try {
      let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${thor}`;
      let response= await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Failed to fetch movie data :",error)
      
    }

  
}


function App() {

  return (
    <>
    <Header/>
    <Footer/>
    </>
  )
}

export default App
