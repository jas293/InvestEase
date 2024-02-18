import {useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/landing.css';
import DOTS from 'vanta/src/vanta.dots';

const Landing = () => {
  useEffect(() => {
    DOTS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x20ff6e,
      color2: 0x16d966,
      backgroundColor: 0x90909,
      size: 3.00,
      spacing: 35.00,
      showLines: false
    });
  }, []);
  

  return (
    <div className="bg" id="vanta">
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
        
      </main>
    </div>
  );
}

export default Landing;