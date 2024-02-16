import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgetP = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    // Add logic to handle password reset here
    // This could involve sending the email to the backend server
    // which would then send a password reset link to the user
    console.log('Request password reset for:', email);

    // Show success message or handle errors
    // For now, we'll just log to the console and navigate to the sign-in page
    navigate('/signin');
  };

  return (
    <div className="forgetp-container">
      <h2>Forgot Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {/* <p>
        Remembered your password? <Link to="/signin">Sign in here!</Link>
      </p> */}
       <p>
        Already have an account? <Link to="/">Sign in here!</Link>
      </p>
    </div>
  );
};

export default ForgetP;
