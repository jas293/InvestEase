// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');


  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return regex.test(password);
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!validatePassword(password)) {
      toast.error('Password must be at least 12 characters long and include uppercase, lowercase, numeric, and special characters.');
      return;
    }


    if (password !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }


    // Add logic to handle the actual sign-up process, like sending data to a backend server


    toast.success('Account created successfully!');
    navigate('/signin'); // Navigate to sign-in page on successful sign-up
  };


  return (
    <div className="signup-container">
      <ToastContainer />
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Other form fields */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};


export default SignUp;
