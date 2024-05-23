import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {BiSearch} from 'react-icons/bi';
import {FaHamburger} from 'react-icons/fa';
import {FiX} from 'react-icons/fi';


const Header = () => {
    const navigate = useNavigate();
    const [searchTerm,setSearchTerm]=useState('');
    const [showNavBar,setShowNavBar]=useState(false);

    const handlerSubmit =(e)=>{
        e.preventDefault();
        navigate(`/search/${searchTerm}`);
        setSearchTerm('');
    }
    
  return (
    <div className='header'>
      <ul className={showNavBar ?'NavBar-Open':'NavBar-Close'}>
        <li>
          <FiX onClick={()=> setShowNavBar(false)}/>
        </li>
        <Link to={'/'} onClick={()=> setShowNavBar(false)} about='Home_Page_URL'>Home</Link>
        <Link to={'/popular'} onClick={()=> setShowNavBar(false)} about='Popular_Movies_Page_URL'>Popular</Link>
        <Link to={'/toprated'} onClick={()=> setShowNavBar(false)} about='Toprated_Movies_Page_URL'>Toprated</Link>
        <Link to={'/genres'} onClick={()=> setShowNavBar(false)} about='Genres_Page_URL'>Genres</Link>
        <Link to={'/upcoming'} onClick={()=> setShowNavBar(false)} about='Upcoming_Movies_Page_URL'>Upcoming</Link>
        <Link to={'/favorites'} onClick={()=> setShowNavBar(false)} about='MyFavorites_Movies_Page_URL'> My Favorites</Link>
      </ul>
      <div>
       <FaHamburger onClick={()=> setShowNavBar(true)} />
      <Link to={'/'} about='Home_Page_URL'>
        <h1>M-Flix</h1>
      </Link>
      </div>
      
      <form onSubmit={handlerSubmit}>
        <input type='text'placeholder='Search...' onChange={(e)=> setSearchTerm(e.target.value) } value={searchTerm}/>
        <button type='submit'><BiSearch/></button>
      </form>
    </div>
  )
}

export default Header