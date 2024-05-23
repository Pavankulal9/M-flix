import {lazy,Suspense} from 'react';
import  './style/App.scss';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './Pages/Home';
import Loading from './Pages/Loading';
const Search = lazy(()=> import('./Pages/Search'));
const Popular = lazy(()=> import('./Pages/MovieCategory/Popular'));
const TopRated = lazy(()=> import('./Pages/MovieCategory/TopRated'));
const Upcoming = lazy(()=> import('./Pages/MovieCategory/Upcoming'));
const Genres = lazy(()=> import('./Pages/MovieCategory/Genres'));
const Favorites = lazy(()=> import('./Pages/Favorites'));

const App=()=>{
    return(
     <div className='app'>
         <Router>
            <Header/>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/search/:searchTerm'} element={<Search/>}/>
                    <Route path={'/popular'} element={<Popular/>}/>
                    <Route path={'/toprated'} element={<TopRated/>}/>
                    <Route path={'/upcoming'} element={<Upcoming/>}/>
                    <Route path={'/genres'} element={<Genres/>}/>
                    <Route path={'/favorites'} element={<Favorites/>}/>
                </Routes>
            </Suspense>
            <Footer/>
         </Router>
     </div>
    );
}

export default App;