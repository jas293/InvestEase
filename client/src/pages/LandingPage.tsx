import {React,FormEvent, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'; // Import useHistory to handle redirects
import { NavigateFunction } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import { navigate } from 'react-router-dom';
import '../style/landingpage.css'; // Import your CSS file
import image from '../images/image.png'
import ScrollReveal from 'scrollreveal';
import Lottie from 'lottie-react'
import animationData from '../assets/Animation - 1710255710277.json'
import animationData2 from '../assets/Animation - 1710269656917.json'
import animationLearn from '../assets/Animation - 1710272517175.json'
import animationSignUp from '../assets/Animation - 1710272950478.json'
import animationInvest from '../assets/Animation - 1710273499861.json'





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

        sr.reveal('.background-image-2', { delay: 400, origin: 'right', scale:0.5 });
        sr.reveal('.text-container', { delay: 400, origin: 'left', scale: 0.6 }); // Adjust scale as needed
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
            <div className="image-container">
                <img src={image} alt="" className="background-image-2" /*id="scrollImage"*/ /> 
                <div className="text-container">
                    <h1>Invest your savings and grow your wealth.</h1>
                    <p>Enjoy up to 100% returns on investments.</p>
                    <div className="buttons">
                        <button id="get-started" onClick={handleSignin}>Sign In</button>
                        <button id="how-it-works" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>  
            </div>  
        </section>
        <section className="section-02">
            <div className="background-img-container">
            <div className="text-container">
                <h1>The Easy Investment solution for you!</h1>
                <p>Take advantage of our state-of-the-art AI system that formulates personalized investment portfolios,
                    designed according to your financial targets and risk tolerance to boost your earnings and increase
                    your capital.
                </p>
            </div>
            <div className="about-us">
                <Lottie animationData={animationData} style={{ /*backgroundColor:'yellow',*/ width: '200px', height: '175px', position:'relative',marginLeft: '-20px', marginBottom: '-160px' }} />
                
                <h3>
                <Link to="/about-us">AboutUs</Link> 
                </h3>
                <p>Learn more about InvestEase</p>
            </div>
            <div className="resources">
            <Lottie animationData={animationData2} style={{ /*backgroundColor:'yellow',*/ width: '200px', height: '140px', position:'relative',marginLeft: '-20px', marginBottom: '-150px', marginTop:'60px' }} />
            <h3>
                <Link to="/resources">Resources & Education</Link> {/* Replace with your actual route */}
            </h3>
                <p>Setup target investment with sizeable amount towards achieving a goal or target. Each fantastic interest
                    on researching your goal.
                </p>
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
        
    </div>
   
  )
}

export default LandingPage

