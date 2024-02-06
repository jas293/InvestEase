import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/style.css'; // Make sure the path is correct


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


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


    // Here, you would handle the sign-in logic, possibly sending a request to your backend
    toast.success('Signed in successfully!');
  };


  return (
    <div className="signin-container">
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>Forgot password?</p>
      <button>Sign Up</button>
    </div>
  );
};


export default SignIn;


