import React, { useState } from 'react';
import httpClient from "../httpClient";
import { renderIntoDocument } from 'react-dom/test-utils';
import { useNavigate, Link } from 'react-router-dom';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();


  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return regex.test(password);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    // First check if passwords match
    if (password !== retypePassword) {
      setError("Passwords don't match.");
      return;
    }


    // Then check if the password is valid
    if (!validatePassword(password)) {
      setError('Password must be at least 12 characters long and include uppercase, lowercase, numeric, and special characters.');
      return;
    }


    // If passwords match and the password is valid, clear any existing error messages
    setError('');


    // TODO: Proceed with the signup process (e.g., sending data to an API)
    try{
      const resp = await httpClient.post("//localhost:5000/register" , {
        email,
        password,
        dob: dateOfBirth,
        phone: phoneNumber,
      });

      window.location.href = "/";

    }catch(error: any){
      if(error.response && error.response.status === 401){
        alert("Invalid credientials");
      }else {
        console.error("An error occurred while signing up:", error);
        // Handle other types of errors, such as network errors
      }
    }


    // For demonstration purposes, log the user details
    console.log('Sign up with:', { email, password, phoneNumber, dateOfBirth });


    // After successful sign up, navigate to the sign-in page
   
    //navigate('/signin');
  };


  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Retype Password"
          required
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Enter your Phone Number"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          required
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/">Sign in here!</Link>
      </p>
    </div>
  );
};


export default SignUp;
