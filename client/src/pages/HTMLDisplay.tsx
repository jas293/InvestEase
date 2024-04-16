import {React, useEffect, useState} from 'react';
import httpClient from "../httpClient";

const HTMLDisplay = () => {
    // Initialize state variables to store data received from the backend
    const [totalScore, setTotalScore] = useState(0);
    const [riskTolerance, setRiskTolerance] = useState(0);

    useEffect(() => {
        // When the component mounts, add a class to the container to hide the half circle
        document.querySelector('.container')?.classList.add('hide-half-circle');
    
        // When the component unmounts, remove the class
        return () => {
          document.querySelector('.container')?.classList.remove('hide-half-circle');
        };
         
      }, []);

       // useEffect for fetching data from the backend when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a GET request to fetch data from the backend using httpClient
                const response = await httpClient.get("//localhost:5000/result");

                // Check if the response status is in the range 200-299 (indicating success)
                if (response.status >= 200 && response.status < 300) {
                    // Extract data from the response.data and update state variables
                    setTotalScore(response.data.total_score);
                    setRiskTolerance(response.data.risk_tolerance);
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
    return (
        <div>
            <h1>total score:{totalScore}</h1>
            <p>This is a test of displaying HTML content in a React component.</p>
            <p>risk tolerance: {riskTolerance}</p>
        </div>
    );
}

export default HTMLDisplay;