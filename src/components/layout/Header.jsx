import './header.scss'
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
      <ul className={showNavBar ?'NavBar-Close':'NavBar-Open'}>
        <FiX onClick={()=> setShowNavBar(false)}/>
        <Link to={'/'} onClick={()=> setShowNavBar(false)}>Home</Link>
        <Link to={'/popular'} onClick={()=> setShowNavBar(false)}>Popular</Link>
        <Link to={'/toprated'} onClick={()=> setShowNavBar(false)}>Toprated</Link>
        <Link to={'/genres'} onClick={()=> setShowNavBar(false)}>Genres</Link>
        <Link to={'/upcoming'} onClick={()=> setShowNavBar(false)}>Upcoming</Link>
        <Link to={'/favorites'} onClick={()=> setShowNavBar(false)}> My Favorites</Link>
      </ul>
      <div>
       <FaHamburger onClick={()=> setShowNavBar(true)}/>
      <Link to={'/'} >
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