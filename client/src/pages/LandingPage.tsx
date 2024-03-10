import React from 'react'
//import '../style/style.css'; // Import your CSS file


const LandingPage: React.FC = () => {
  return (
    <div className='Landing-page'>
        <div className='image-container'>
            <div className='text-container'>
                <header>
                    <h1>Invest your savings <br /> and grow your <br />wealth.</h1><br />
                    <p>Enjoy up to 100% returns <br /> on investments.</p>
                    <div className='cta-buttons'>
                        <button id="get-started">Get Started</button>
                        <button id="how-it-works">How it works</button>
                    </div>
                </header>
            </div>
        </div>
        
        <div className='image2-container'>
            <div className="text-container">
                <h3>The best investment solution for you</h3>
                <p>Take advantage of our state-of-the-art AI system that formulates 
                    personalized investment portfolios, designed accordingly to your
                    financial targets and risk tolerance to boost your earnings and 
                    increase your capital.
                </p>
            </div>
        </div>
    </div>
  )
}

export default LandingPage

