import {React, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import '../style/HTMLDisplay.css'; // Import your CSS file
import httpClient from "../httpClient";

const HTMLDisplay = () => {
    // Initialize state variables to store data received from the backend
    const [totalScore, setTotalScore] = useState(0);
    const [riskTolerance, setRiskTolerance] = useState(0);
    const [symbol, setSymbol] = useState([]);
    const [amount, setAmount] = useState([]);
    const [historicalReturn, setHistoricalReturn] = useState([]);
    const [volatility, setVolatility] = useState([]);
    const [price, setPrice] = useState([]);
    const [yearYield, setYearYield] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    
    const values = totalScore;
    

    useEffect(() => {
        // When the component mounts, add a class to the container to hide the half circle
        document.querySelector('.container')?.classList.add('hide-half-circle');

        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (!token){
            return; // If user is not logged in, exit early
        }else{
            setAuthenticated(true);
        }

    
        // When the component unmounts, remove the class
        /*return () => {
          document.querySelector('.container')?.classList.remove('hide-half-circle');
        };*/
        // When the component unmounts, remove the class and reset state variables
    return () => {
        document.querySelector('.container')?.classList.remove('hide-half-circle');
        setTotalScore(0);
        setRiskTolerance(0);
        setSymbol([]);
        setAmount([]);
        setHistoricalReturn([]);
        setVolatility([]);
        setPrice([]);
        setYearYield([]);
    };
        
         
      }, []);

      

       // useEffect for fetching data from the backend when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                /*const token = sessionStorage.getItem('token') || localStorage.getItem('token');
                if (!token) return; */// If user is not logged in, exit early
                // Make a GET request to fetch data from the backend using httpClient
                const response = await httpClient.get("//localhost:5000/result");

                // Check if the response status is in the range 200-299 (indicating success)
                if (response.status >= 200 && response.status < 300) {
                    // Extract data from the response.data and update state variables
                    setTotalScore(response.data.total_score);
                    setRiskTolerance(response.data.risk_tolerance);
                    setSymbol(response.data.symbol_array);
                    setAmount(response.data.amount_array);
                    setHistoricalReturn(response.data.historical_returns);
                    setVolatility(response.data.volatilities);
                    setPrice(response.data.prices);
                    setYearYield(response.data.yields_12m);
                    //setAuthenticated(true);
                } else {
                    // Throw an error if the response status is not in the success range
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the async function to fetch data when the component mounts

        
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const navigate = useNavigate(); // Use useNavigate to get the navigation function
    function removeCookie(name: string) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    const handleSubmit = () => {
        // Remove the token from session storage
        sessionStorage.removeItem('token');
        localStorage.removeItem('token')
        removeCookie('session_cookie');
        navigate('/');
    }
    if (!authenticated) {
        return (
            <div className='resultPage'>
                <div className="questionnaire_header">
                    <h2>InvestEase</h2>
                    <Link to="/SignIn"><h3>Login</h3></Link>
                    {/*<input type='link' value="Logout" onClick={handleSubmit}className="handlesubmit" />*/}
                </div>
                
                <h2 className='error_message'>Please Login To Access Your Result!!</h2>
            </div>
        );
    }

    const data = [{
        type: "indicator",
        mode: "gauge+number",
        value: values,
        domain: { x: [0, 1], y: [0, 1] },
        title: { text: "Investor Risk Tolerance", font: { size: 24, color: "darkblue" } },
        gauge: {
            axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "green" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                { range: [0, 30], color: 'aliceblue' },
                { range: [30, 60], color: 'lightblue' },
                { range: [60, 100], color: 'skyblue' },
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: values
            }
        }
    }];

    const layout = {
        annotations: [{
            x: 0.5,
            y: 0.45,
            text: `Your Risk Tolerance: <br>${riskTolerance}`,
            showarrow: false,
            font: { size: 17, color: 'darkblue' },
            align: 'center'
        }]
    };

    return (
         
        <div className='resultPage'>
            <div className="questionnaire_header">
                <h2>InvestEase</h2>
                <Link to="/Dashboard"><h3>Dashboard</h3></Link>
                <h3 onClick={handleSubmit}>Logout</h3>
                {/*<input type='link' value="Logout" onClick={handleSubmit}className="handlesubmit" />*/}
            </div>
            <h1 className="pageName">Result Page:</h1>
            <div className="plotContainer">
                <Plot
                    data={data}
                    layout={layout}
                />
            </div>
            <div className="stocksTable">
                <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Symbol</th> 
                        <th>Amount</th>
                        <th>Historical Return</th>
                        <th>Volatility</th>
                        <th>Price</th>
                        <th>12 Month Yield</th>
                    </tr>
                </thead>
                <tbody>
                    {symbol.map((sym, index) => (
                        <tr key={index}>
                            <td className='index'>{index+1}</td>
                            <td>{sym}</td>
                            <td>${amount[index]}</td>
                            <td>{historicalReturn[index]}%</td>
                            <td>{volatility[index]}%</td>
                            <td>${price[index]}</td>
                            <td>{yearYield[index]}%</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
        
        
    );
}

export default HTMLDisplay;