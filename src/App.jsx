import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import MovieSlider from './components/MovieSlider';
import Poster from './components/Poster';
import Home from './pages/Home';
import { Routes,Route } from 'react-router-dom';






function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home />}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
