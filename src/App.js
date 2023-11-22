import React from 'react';
import  './css/app.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/layout/Header';
import Home from './components/HomePage/Home';
import Movie from './components/MovieItems/Movie';
import Search from './components/SearchItem/Search';
import Footer from './components/layout/Footer';
import Popular from './components/MovieCategory/Popular';
import TopRated from './components/MovieCategory/TopRated';
import Upcoming from './components/MovieCategory/Upcoming';
import Genres from './components/MovieCategory/Genres';
import Favorites from './components/layout/Favorites';
import {ToastContainer} from 'react-toast'
const App=()=>{
    return(
     <div className='app'>
        <ToastContainer delay={3000}/>
         <Router>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/movie/:id'} element={<Movie/>}/>
                <Route path={'/search/:searchTerm'} element={<Search/>}/>
                <Route path={'/popular'} element={<Popular/>}/>
                <Route path={'/toprated'} element={<TopRated/>}/>
                <Route path={'/upcoming'} element={<Upcoming/>}/>
                <Route path={'/genres'} element={<Genres/>}/>
                <Route path={'/favorites'} element={<Favorites/>}/>
            </Routes>
            <Footer/>
         </Router>
     </div>
    );
}

export default App;