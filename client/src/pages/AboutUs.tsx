import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/aboutUs.css';

type BoxType = {
    id: string,
    heading: string,
    subHeading: string,
    descriptionItems: Array<String>
    showDescriptionItems?: boolean
    toggleDescription: Function
    showLabel: string
    hideLabel: string,
    hasHover: boolean,
    onHoverIn: Function,
    onHoverOut: Function,
    hoverDivId: string,
}

const AboutUsBox = ({id, heading, subHeading, descriptionItems, showDescriptionItems, toggleDescription, showLabel, hideLabel, hasHover, onHoverIn, onHoverOut, hoverDivId}: BoxType ) => {
    console.log(heading, subHeading, descriptionItems);
    console.log('HasHover', hasHover);
    console.log('Hover id', hoverDivId);

    const containerClass = 'about-us-box-item-container ' + (hasHover ? 'is-active' : !(hoverDivId === '' || hoverDivId === id) ? 'is-inactive' : '');
    console.log("Container class", containerClass)

    return (
        <div id={id} className={containerClass}
            onMouseEnter={() => {
                console.log('Hovering on divv....', id)
                onHoverIn(id)
            }}
            onMouseLeave={() => {
                console.log('Hovering away from div', id);
                onHoverOut(id)
            }}
        >
            <h3 className='item_title'>
                {heading}
            </h3>
            <div className='item_contents'>
                <div className='item_subheading'>
                    {subHeading}
                </div>
                <div className='item_button_container'>
                    <a className='item_button_' onClick={() => toggleDescription()}>
                        {showDescriptionItems ? hideLabel: showLabel}
                    </a>
                </div>
                {showDescriptionItems && (
                    <div className='item_description_container'>
                        <ul>
                            {descriptionItems.map(item => <li>{item}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

const AboutUs: React.FC = () => {
    const [showMore, setShowMore] = useState(false);
    const [showBox1Items, setShowBox1Items] = useState(false);
    const [showBox2Items, setShowBox2Items] = useState(false);
    const [showBox3Items, setShowBox3Items] = useState(false);
    const [hasHoverOverBox1, setHasHoverOverBox1] = useState(false);
    const [hasHoverOverBox2, setHasHoverOverBox2] = useState(false);
    const [hasHoverOverBox3, setHasHoverOverBox3] = useState(false);
    const [hoverDivIdName, setHoverDivIdName] = useState('');
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

    const onHoverAboutUsBox: Function = (id:string) => {
        let hoverDivVar = '';
        if ("company_overview" === id) {
            setHasHoverOverBox1(true);
            hoverDivVar = 'company_overview';
        } else if ("offer" === id) {
            setHasHoverOverBox2(true)
            hoverDivVar = 'offer';
        } else if ("mission" === id) {
            setHasHoverOverBox3(true)
            hoverDivVar = 'mission';
        }
        setHoverDivIdName(hoverDivVar);
    }

    const onHoverAwayAboutUsBox: Function = (id:string) => {
        if ("company_overview" === id) {
            setHoverDivIdName('');
            setHasHoverOverBox1(false);
        } else if ("offer" === id) {
            setHoverDivIdName('');
            setHasHoverOverBox2(false)
        } else if ("mission" === id) {
            setHoverDivIdName('');
            setHasHoverOverBox3(false)
        }

        setShowBox1Items(false);
        setShowBox2Items(false);
        setShowBox3Items(false);
    }

    const box1Values: BoxType = {
        id:'company_overview',
        heading: "Company Overview",
        subHeading: "Discover Investing with Us.Begin your financial journey with a trusted companion.",
        descriptionItems: [
            "Simple Beginnings: We introduce you to investing, step ¬¬by step",
            "Effortless Management: Our platform handles the complexities of the stock market.",
            "Knowledge at Your Pace: Learn the ins and outs of investing with easy-to-follow resources.",
            "Inclusive Community: Connect with fellow starters, share experiences, and grow your confidence together.",
            "Friendly Interface: No complicated terms, just a straightforward way to start your investment journey."
        ],
        showLabel: "Learn more",
        hideLabel: "Show less",
        toggleDescription: () => {},
        hasHover: false,
        onHoverIn: () => {},
        onHoverOut: () => {},
        hoverDivId: ''
    }

    const box2Values: BoxType = {
        id:'offer',
        heading: "What We Offer",
        subHeading: "Investment Options, Simplified. Select from strategies that match your goals and comfort level.",
        descriptionItems: [
            "Simple Beginnings: We introduce you to investing, step ¬¬by step",
            "Effortless Management: Our platform handles the complexities of the stock market.",
            "Knowledge at Your Pace: Learn the ins and outs of investing with easy-to-follow resources.",
            "Inclusive Community: Connect with fellow starters, share experiences, and grow your confidence together.",
            "Friendly Interface: No complicated terms, just a straightforward way to start your investment journey."
        ],
        showLabel: "See Services",
        hideLabel: "Hide Services",
        toggleDescription: () => {},
        hasHover: false,
        onHoverIn: () => {},
        onHoverOut: () => {},
        hoverDivId: ''
    }

    const box3Values: BoxType = {
        id:'mission',
        heading: "Our Mission",
        subHeading: "Finance for All. We're dedicated to making the stock market approachable.",
        descriptionItems: [
            "Debunking Complexity: Our goal is to simplify the stock market maze.",
            "Streamlined Investing: Let our platform tailor your portfolio to the market with minimal input required.",
            "Education-Centric: We prioritize your financial education with straightforward guides and tips.",
            "Community Driven: Join hands with newcomers and share your learning curve.",
            "Clear & Intuitive: Our platform is your clear window into the world of finance."
        ],
        showLabel: "Discover Our Mission ",
        hideLabel: "Show Less",
        toggleDescription: () => {},
        hasHover: false,
        onHoverIn: () => {},
        onHoverOut: () => {},
        hoverDivId: ''
    }

    const toggleBoxElements: Function = (id: string) => {
        console.log('Toggling box elemetns', id)
        // e.preventDefault();
        let updateBox1 = false, updateBox2 = false, updateBox3 = false;
        setShowBox1Items(!showBox1Items)
        if ("company_overview" === id) {
            updateBox1 = true
        } else if ("offer" === id) {
            updateBox2 = true
        } else if ("mission" === id) {
            updateBox3 = true
        }

        setShowBox1Items(updateBox1 ? !showBox1Items : false);
        setShowBox2Items(updateBox2 ? !showBox2Items : false);
        setShowBox3Items(updateBox3 ? !showBox3Items : false);
    }

    return (
        <div id="about-us-container">
            <div id='section1' className='about-us-section'>
                <div>
                    <div>
                        <h1>About us</h1>
                    </div>
                    <div className='main-subheading'>
                        InvestEase - Investing Made Simple
                    </div>
                </div>
            </div>
            <div id='section2' className='about-us-section'>
                <div id='about-us-info-container'>
                    <div id="info-title">
                        <h3>
                            <span>Bridging</span> the gap between technology and investements.
                        </h3>
                    </div>
                    <div id='info-description'>
                        <p>Welcome to InvestEase, where we transform the daunting world of investments into a clear path for your financial empowerment. </p>
                        <p>Our dedication lies in offering straightforward investment solutions and educational resources tailored for those new to the financial landscape. 
                        Begin your journey to financial literacy and growth with us, effortlessly.</p>
                    </div>
                </div>
                <div className='box_heading_container'>
                    <h2 className='box_title'>WHO ARE WE</h2>
                    <div className='box_title_right'></div>
                </div>
                <div id='about-us-boxes'>
                    <AboutUsBox
                        id={box1Values.id}
                        heading={box1Values.heading}
                        subHeading={box1Values.subHeading}
                        descriptionItems={box1Values.descriptionItems}
                        showDescriptionItems={showBox1Items}
                        showLabel={box1Values.showLabel}
                        hideLabel={box1Values.hideLabel}
                        hasHover={hasHoverOverBox1}
                        toggleDescription={() => toggleBoxElements(box1Values.id)}
                        onHoverIn={(id: string) => onHoverAboutUsBox(id)}
                        onHoverOut={(id: string) => onHoverAwayAboutUsBox(id)}
                        hoverDivId={hoverDivIdName}
                    />
                    <AboutUsBox
                        id={box2Values.id}
                        heading={box2Values.heading}
                        subHeading={box2Values.subHeading}
                        descriptionItems={box2Values.descriptionItems}
                        showDescriptionItems={showBox2Items}
                        showLabel={box2Values.showLabel}
                        hideLabel={box2Values.hideLabel}
                        hasHover={hasHoverOverBox2}
                        toggleDescription={() => toggleBoxElements(box2Values.id)}
                        onHoverIn={(id: string) => onHoverAboutUsBox(id)}
                        onHoverOut={(id: string) => onHoverAwayAboutUsBox(id)}
                        hoverDivId={hoverDivIdName}
                    />
                    <AboutUsBox
                        id={box3Values.id}
                        heading={box3Values.heading}
                        subHeading={box3Values.subHeading}
                        descriptionItems={box3Values.descriptionItems}
                        showDescriptionItems={showBox3Items}
                        showLabel={box3Values.showLabel}
                        hideLabel={box3Values.hideLabel}
                        hasHover={hasHoverOverBox3}
                        toggleDescription={() => toggleBoxElements(box3Values.id)}
                        onHoverIn={(id: string) => onHoverAboutUsBox(id)}
                        onHoverOut={(id: string) => onHoverAwayAboutUsBox(id)}
                        hoverDivId={hoverDivIdName}
                    />
                </div>
            </div>
            <div id='section3' className='about-us-section'>
                <div className='referal-container'>
                    <div className='box_heading_container'>
                        <h2 className='box_title'>REFERAL PROGRAM</h2>
                        <div className='box_title_right'></div>
                    </div>
                    <div>
                        <h4>
                            Empower Others. Invite Friends, family Grow Together
                        </h4>
                    </div>
                    <div style={{marginBottom: '.5rem'}}>
                        Share the ease of investing with friends and get rewarded. 
                        With InvestEase, every referral enriches your experience and expands our community of savvy investors. 
                        Let's build wealth side by side. Let's grow a financially savvy community together.
                    </div>
                    <div>
                        <a onClick={() => { console.log("CLicked on refer link")}}> Refer </a>
                    </div>
                </div>
            </div>
            <div id='footer-section' className='about-us-section'>
                <div className='footer-container'>
                    <a href='/LandingPage'>Home</a>
                    <a href='/resources'>Resouces</a>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
