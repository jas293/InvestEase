import {React,FormEvent, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'; // Import useHistory to handle redirects
import { NavigateFunction } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import '../style/landingpage.css'; // Import your CSS file
import image from '../images/image.png'
import ScrollReveal from 'scrollreveal';
import Lottie from 'lottie-react'


import animationData from '../assets/Animation_-_1710255710277.json'
import animationData2 from '../assets/Animation_-_1710269656917.json'
import animationLearn from '../assets/Animation_-_1710272517175.json'
import animationSignUp from '../assets/Animation_-_1710272950478.json'
import animationInvest from '../assets/Animation_-_1710273499861.json'





const LandingPage: React.FC = () => {
    
    useEffect(() => {
        // When the component mounts, add a class to the container to hide the half circle
        document.querySelector('.container')?.classList.add('hide-half-circle');
    
        // When the component unmounts, remove the class
        return () => {
          document.querySelector('.container')?.classList.remove('hide-half-circle');
        };
      }, []);
    /*useEffect(() => {
        // Check if user is logged in (e.g., by checking for session cookie)
        const isLoggedIn = document.cookie.includes('session_cookie='); // Assuming session cookie name is 'session'

        if (!isLoggedIn) {
            // Redirect to login page if not logged in
            window.location.href = '/';
        }
    }, []);*/
    const [sessionCookie, setSessionCookie] = useState<string>('');

    useEffect(() => {
        // Function to extract session cookie
        const extractSessionCookie = () => {
            console.log("Document Cookie:", document.cookie);
            const sessionCookie = document.cookie.split('; ')
                .find(cookie => cookie.startsWith('session_cookie='));
            console.log("Session Cookie:", sessionCookie);
            if (sessionCookie) {
                const [, value] = sessionCookie.split('='); // Extract cookie value
                console.log("Extracted Value:", value);
                setSessionCookie(value); // Set session cookie in state
            }
        };
    
        // Call the function to extract session cookie
        extractSessionCookie();
    }, []);

    useEffect(() => {
        
        const sr = ScrollReveal({
            reset: true,  // Resets the animation when elements are no longer visible
            duration: 2500, // Duration of the animation in milliseconds
            delay: 400, // Delay before the animation starts in milliseconds
            origin: 'bottom', // Origin of the animation (e.g., top, bottom, left, right)
            distance: '60px', // Distance the element moves during the animation
            mobile: false // Whether to enable animation on mobile devices
        });

        {sr.reveal('.background-image-2', { delay: 400, origin: 'right', scale:0.5 });}
        sr.reveal('.section-02 .background-img-container .text-container', { delay: 400, origin: 'left', scale: 0.6 }); // Adjust scale as needed
    
        sr.reveal('.about-us', { delay: 400, origin: 'left', scale: 0.6 }); // Adjust scale as needed
        sr.reveal('.resources', { delay: 400, origin: 'left', scale: 0.6 }); // Adjust scale as needed

    }, []);

    // Function to handle logout
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        // Clear authentication state (e.g., remove session cookies)
        // For example, if using session cookies:
        document.cookie = 'session_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // Redirect to the login page
        window.location.href = '/';
    };
    useEffect(() => {
        // Add any necessary cleanup logic here, if needed
        return () => {
            // Cleanup code, if any
        };
    }, []);

    const handleSignin = () =>{
        // Redirect to the login page
        window.location.href = '/SignIn';
    }
    const handleSignup = () =>{
        // Redirect to the login page
        window.location.href = '/signup';
    }

    

    return (
 
    <div className='Landing-page'>
    
        <section className="section-01">
        <div className='resultPage'>
                <div className="questionnaire_header">
                    <h2><i className="fas fa-line-chart"></i>InvestEase</h2>
                    
                    {/*<input type='link' value="Logout" onClick={handleSubmit}className="handlesubmit" />*/}
                </div>
                
            </div>
            <div className="image-container">
                <img src={image} alt="" className="background-image-2" /*id="scrollImage"*/ /> 
                <div className="text-container">
                    <h1>Invest your savings and grow your wealth.</h1>
                    <p>The Easy Investment solution for you!</p>
                    <div className="buttons">
                        <button id="get-started" onClick={handleSignin}>Sign In</button>
                        <button id="how-it-works" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>  
            </div>  
        </section>
        
        <section className="section-03">
            <div className="text-container-03">
                <h2>We have built a solution that makes investment as easy as 1,2,3.</h2>
                <p>Growing your wealth in 3 easy simple steps.</p>
            </div>
            <div className="learn-signup-invest-container">
            <div className="learn">
            <Lottie animationData={animationLearn} style={{ /*backgroundColor:'yellow',*/ width: '200px', height: '200px', position:'relative',marginLeft: '160px', marginTop: '-200px' }} />
                <h2>Learn</h2>
                <p>Divide into investing with ease and clarity, tailored just for you.</p>
            </div>
            <div className="sign-up">
            
            <Link to="/signup"><Lottie animationData={animationSignUp} style={{ /*backgroundColor:'yellow',*/ width: '200px', height: '175px', position:'relative',marginLeft: '180px', marginTop: '-180px' }} /></Link> {/* Replace with your actual route */}
                <h2>
                <Link to="/signup">Sign Up</Link> {/* Replace with your actual route */}
                </h2>
                <p>With a few taps, under 5 minutes you can set up a profile. Take our questionaire and get started.</p>
            </div>
            <div className="invest">
            <Lottie animationData={animationInvest} style={{ /*backgroundColor:'yellow',*/ width: '200px', height: '185px', position:'relative',marginLeft: '40px', marginTop: '-180px' }} />
                
                <h2>Invest</h2>
                <p>Craft your wealth story, guided by personalized investment strategies.</p>
            </div>
            </div>
            
        </section>
        <section className="section-02">
        <div className="price-background">
            <div className="price-container">
                <div className="pricing-table">
                    <div className="pricing-plan">
                    <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" className="pricing-img"/>
                    <h2 className="pricing-header">Basic</h2>
                    <ul className="pricing-features">
                    <li className="pricing-features-item">Ads</li>
                    <li className="pricing-features-item">15 min-delayed data</li>
                    <li className="pricing-features-item">Educational Resources</li>
                    </ul>
                    <span className="pricing-price">Free</span>
                    <a href="/signup" className="pricing-button">Sign up</a>
                </div>
                
                <div className="pricing-plan">
                    <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" className="pricing-img"/>
                    <h2 className="pricing-header">Premium</h2>
                    <ul className="pricing-features">
                    <li className="pricing-features-item">No Ads</li>
                    <li className="pricing-features-item">15 min-delayed Data</li>
                    <li className="pricing-features-item">Advance Indicator</li>
                    <li className="pricing-features-item">Advance Chart</li>
                    <li className="pricing-features-item">Enhanced Educational Resources</li>
                    </ul>
                    <span className="pricing-price">$9.99</span>
                    <a href="#/" className="pricing-button is-featured">Upgrade</a>
                </div>
                <div className="pricing-plan">
                <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" className="pricing-img"/>
                    <h2 className="pricing-header">Advanced</h2>
                    <ul className="pricing-features">
                    <li className="pricing-features-item">No Ads</li>
                    <li className="pricing-features-item">Live Data</li>
                    <li className="pricing-features-item">Advance Indicator</li>
                    <li className="pricing-features-item">Advance Chart</li>
                    <li className="pricing-features-item">Enhanced Educational Resources</li>
                    <li className="pricing-features-item">AI Assistance</li>
                    <li className="pricing-features-item">Virtual Trading</li>
                    </ul>
                    <span className="pricing-price">$19.99</span>
                    <a href="#/" className="pricing-button is-featured">Upgrade</a>
                </div>
                </div>
            </div>
        </div>
        </section>
        
    </div>
   
  )
}

export default LandingPage