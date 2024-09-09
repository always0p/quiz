import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  return (
    <div className='home-container'>
      <header className='home-header'>
        <h1 className='home-title'>Welcome to Quiz App</h1>
        <p className='home-description'>
          Test your knowledge with our engaging quiz questions. Challenge yourself and see how you score!
        </p>
      </header>
      <nav className='home-nav'>
      <Link to='/quiz' className='home-nav-link'>Take a random Quiz</Link>
      <Link to='/quizsetup' className='home-nav-link'>Custom Quiz</Link>
      <div>
      <Link to='/login' className='home-nav-link'>Login</Link>
      <Link to='/signup' className='home-nav-link'>Sign Up</Link>
      </div>
     
        
      </nav>
    </div>
  );
};

export default Home;
