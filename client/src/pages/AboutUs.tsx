import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs: React.FC = () => {
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // When the component mounts, add a class to the container to hide the half circle
        document.querySelector('.container')?.classList.add('hide-half-circle');
    
        // When the component unmounts, remove the class
        return () => {
          document.querySelector('.container')?.classList.remove('hide-half-circle');
        };
      }, []);

    const handleLearnMoreClick = () => {
        setShowMore(!showMore); // Toggles the boolean value of showMore
    };

    return (
        <div className="about-us-container">
            <h1>Welcome to InvestEase</h1>
            <p>InvestEase: Investing Made Simple</p>
            <p>Welcome to InvestEase, where we transform the daunting world of investments into a clear path for your financial empowerment. Our dedication lies in offering straightforward investment solutions and educational resources tailored for those new to the financial landscape. Begin your journey to financial literacy and growth with us, effortlessly.</p>
            <button onClick={handleLearnMoreClick}>{showMore ? 'Show Less' : 'Learn More'}</button> {/* Toggles the text */}
            {showMore && (
                <>
                    <section>
                        <h2>Our Mission</h2>
                        <p>To simplify the investment process, making it accessible and engaging for everyone, especially beginners. InvestEase is here to demystify investing, offering easy-to-understand strategies and the tools you need to start growing your wealth confidently.</p>
                    </section>
                    <section>
                        <h2>Who We Serve</h2>
                        <ul>
                            <li>Young Professionals & Millennials: Eager to secure their financial future but seeking straightforward investment solutions.</li>
                            <li>Busy Working Adults: Looking for a hassle-free way to grow their savings without the need to become investment experts.</li>
                            <li>Novice Investors: New to the investment world, wanting clear guidance and a user-friendly experience.</li>
                            <li>Educational Enthusiasts: Keen on learning about investing and personal finance through accessible resources.</li>
                        </ul>
                    </section>
                    {/* Removed the Sign In button as per your request */}
                </>
            )}
        </div>
    );
};

export default AboutUs;
