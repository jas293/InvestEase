import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/landing.css';
import portImage from '../public/stock.svg'; // Update the path to the image file


const landing = () => {
    return (
      <div>
        <header>
          <nav>
            <div className="logo-text">InvestEase</div>
            
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Resources & Education</a></li>
            </ul>
            <button className="sign-in"><Link to="/signin">Sign In</Link></button>
          </nav>
        </header>
        <main>
          <section className="hero">
          <h1>Begin Your Investment Journey Today</h1>
            <p>Find Your Ideal Investment Route with Our Detailed Investor Survey</p>
            <p>Investment Strategies Designed to Fulfill Your Goals</p>
            <p>Take advantage of our state-of-the-art AI system that formulates personalized investment portfolios, designed according to your financial targets and risk tolerance, to boost your earnings and increase your capital.</p>
            <button className="cta-button" role='button'>Start The Quiz</button>
          </section>
          <img className='port' src={portImage}  alt='Investment Portfolio' />
        </main>
      </div>
    );
  }
  
  export default landing;